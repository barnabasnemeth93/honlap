"""
Gamification: XP, coins, ranks. Ledger-based rewards (DetectiveRewardLog) are the source of truth.
"""
import uuid
from typing import Dict, Any, Optional, List

from models import db, DetectiveRewardLog

# Rank thresholds (XP required for each rank). Order ascending.
RANK_THRESHOLDS = [
    (0, "Újonc nyomozó"),
    (75, "Segédnyomozó"),
    (100, "Kezdő nyomozó"),
    (125, "Utcai megfigyelő"),
    (150, "Nyomkövető"),
    (200, "Tapasztalt nyomozó"),
    (300, "Városi nyomozó"),
    (700, "Mester nyomozó"),
    (1000, "Főnyomozó"),
    (1500, "Legendás nyomozó"),
]


# Default reward amounts (used when clue has no per-clue override)
CLUE_XP = 5
CLUE_COINS = 3
# Campaign completion: per-difficulty defaults when campaign has no xp_reward/coins_reward
CAMPAIGN_XP_BY_DIFFICULTY = {1: 20, 2: 30, 3: 45}
CAMPAIGN_COINS_BY_DIFFICULTY = {1: 15, 2: 20, 3: 30}
DEFAULT_CAMPAIGN_XP = 30
DEFAULT_CAMPAIGN_COINS = 20


# ---------- Rank helpers (unchanged) ----------
DIFFICULTY_LABELS = {1: "Könnyű", 2: "Közepes", 3: "Nehéz"}
DIFFICULTY_STARS = {1: "⭐", 2: "⭐⭐", 3: "⭐⭐⭐"}


def get_difficulty_display(difficulty: Optional[int]) -> Optional[str]:
    """
    Unified helper for difficulty display.
    Returns a combined "stars + label" string, e.g. "⭐⭐ Közepes".
    """
    if difficulty is None:
        return None
    stars = DIFFICULTY_STARS.get(difficulty)
    label = DIFFICULTY_LABELS.get(difficulty)
    if not stars and not label:
        return None
    if stars and label:
        return f"{stars} {label}"
    return stars or label


def get_rank_for_xp(xp: int) -> str:
    """Return the rank name for a given XP total."""
    xp = max(0, int(xp))
    rank_name = RANK_THRESHOLDS[0][1]
    for threshold, name in RANK_THRESHOLDS:
        if xp >= threshold:
            rank_name = name
    return rank_name


def get_next_rank_info(xp: int) -> Optional[Dict[str, Any]]:
    """Return info about the next rank, or None if at max rank."""
    xp = max(0, int(xp))
    for i, (threshold, name) in enumerate(RANK_THRESHOLDS):
        if xp < threshold:
            prev_threshold = RANK_THRESHOLDS[i - 1][0] if i > 0 else 0
            return {
                "name": name,
                "xp_required": threshold,
                "xp_current": xp - prev_threshold,
                "xp_needed": threshold - xp,
                "xp_in_tier": threshold - prev_threshold,
            }
    return None


# ---------- Clue reward amounts (per-clue override) ----------
def get_clue_rewards(clue) -> tuple:
    """Return (xp, coins) for solving this clue. Uses per-clue values if set, else defaults."""
    xp = getattr(clue, "xp_reward", None)
    coins = getattr(clue, "coins_reward", None)
    return (xp if xp is not None else CLUE_XP, coins if coins is not None else CLUE_COINS)


# ---------- Ledger: source keys (deduplication) ----------
def build_reward_source_key(
    reward_type: str,
    user_id: int,
    *,
    clue_id: Optional[int] = None,
    campaign_id: Optional[int] = None,
    achievement_id: Optional[int] = None,
) -> str:
    """Build a deterministic source_key for deduplication."""
    if reward_type == "clue_solved" and clue_id is not None:
        return f"clue_solved:user_{user_id}:clue_{clue_id}"
    if reward_type == "campaign_completed" and campaign_id is not None:
        return f"campaign_completed:user_{user_id}:campaign_{campaign_id}"
    if reward_type == "achievement_unlocked" and achievement_id is not None:
        return f"achievement_unlocked:user_{user_id}:achievement_{achievement_id}"
    # Fallback for other types
    parts = [reward_type, f"user_{user_id}"]
    if clue_id is not None:
        parts.append(f"clue_{clue_id}")
    if campaign_id is not None:
        parts.append(f"campaign_{campaign_id}")
    if achievement_id is not None:
        parts.append(f"achievement_{achievement_id}")
    return ":".join(parts)


# ---------- Ledger: totals and history ----------
def get_user_total_xp(user_id: int) -> int:
    """Total XP from reward log (source of truth)."""
    from sqlalchemy import func
    row = db.session.query(func.coalesce(func.sum(DetectiveRewardLog.xp_amount), 0)).filter(
        DetectiveRewardLog.user_id == user_id
    ).scalar()
    return int(row) if row is not None else 0


def get_user_coin_balance(user_id: int) -> int:
    """Current coin balance = sum of all coin_amount (supports future negative for shop)."""
    from sqlalchemy import func
    row = db.session.query(func.coalesce(func.sum(DetectiveRewardLog.coin_amount), 0)).filter(
        DetectiveRewardLog.user_id == user_id
    ).scalar()
    return int(row) if row is not None else 0


def get_user_reward_log(user_id: int, limit: int = 50) -> List[Dict[str, Any]]:
    """Latest reward log entries for display. Newest first."""
    rows = (
        DetectiveRewardLog.query.filter_by(user_id=user_id)
        .order_by(DetectiveRewardLog.created_at.desc())
        .limit(limit)
        .all()
    )
    return [
        {
            "id": r.id,
            "reward_type": r.reward_type,
            "description": r.description,
            "xp_amount": r.xp_amount,
            "coin_amount": r.coin_amount,
            "created_at": r.created_at,
            "campaign_id": r.campaign_id,
            "clue_id": r.clue_id,
            "achievement_id": r.achievement_id,
        }
        for r in rows
    ]


# ---------- Grant reward (idempotent, returns True if created) ----------
def grant_reward(
    user_id: int,
    reward_type: str,
    source_key: str,
    xp_amount: int = 0,
    coin_amount: int = 0,
    *,
    campaign_id: Optional[int] = None,
    clue_id: Optional[int] = None,
    achievement_id: Optional[int] = None,
    description: Optional[str] = None,
    metadata_json: Optional[dict] = None,
    update_user_cache: bool = True,
    user=None,
) -> bool:
    """
    Insert a reward log row if source_key does not exist. Prevents duplicate rewards.
    Returns True if a new row was created, False if already existed.
    """
    existing = DetectiveRewardLog.query.filter_by(source_key=source_key).first()
    if existing:
        return False
    row = DetectiveRewardLog(
        user_id=user_id,
        reward_type=reward_type,
        source_key=source_key,
        xp_amount=xp_amount,
        coin_amount=coin_amount,
        campaign_id=campaign_id,
        clue_id=clue_id,
        achievement_id=achievement_id,
        description=description,
        metadata_json=metadata_json,
    )
    db.session.add(row)
    if update_user_cache and user is not None:
        user.xp = get_user_total_xp(user_id) + xp_amount
        user.coins = get_user_coin_balance(user_id) + coin_amount
        user.rank = get_rank_for_xp(user.xp)
    return True


def grant_clue_solved_reward(user, clue, campaign=None) -> bool:
    """
    Grant reward for solving a clue. One reward per user per clue (source_key).
    Returns True if reward was newly created, False if duplicate.
    """
    source_key = build_reward_source_key("clue_solved", user.id, clue_id=clue.id)
    xp, coins = get_clue_rewards(clue)
    campaign_id = getattr(campaign, "id", None) or getattr(clue, "campaign_id", None)
    desc = f"Nyom megoldva: {clue.title or ('Nyom #%s' % getattr(clue, 'order_index', ''))}"
    return grant_reward(
        user.id,
        "clue_solved",
        source_key,
        xp_amount=xp,
        coin_amount=coins,
        campaign_id=campaign_id,
        clue_id=clue.id,
        description=desc,
        update_user_cache=True,
        user=user,
    )


def get_campaign_completion_rewards(campaign) -> tuple:
    """
    Return (xp, coins) for completing this campaign.
    Uses campaign.xp_reward/coins_reward if set; otherwise difficulty-based defaults.
    """
    xp = getattr(campaign, "xp_reward", None)
    coins = getattr(campaign, "coins_reward", None)
    if xp is not None and coins is not None:
        return (xp, coins)
    diff = getattr(campaign, "difficulty", None)
    if diff in CAMPAIGN_XP_BY_DIFFICULTY and diff in CAMPAIGN_COINS_BY_DIFFICULTY:
        return (CAMPAIGN_XP_BY_DIFFICULTY[diff], CAMPAIGN_COINS_BY_DIFFICULTY[diff])
    return (DEFAULT_CAMPAIGN_XP, DEFAULT_CAMPAIGN_COINS)


def grant_campaign_completed_reward(user, campaign) -> bool:
    """
    Grant reward for completing a campaign. One reward per user per campaign.
    Returns True if reward was newly created, False if duplicate.
    """
    xp, coins = get_campaign_completion_rewards(campaign)
    source_key = build_reward_source_key("campaign_completed", user.id, campaign_id=campaign.id)
    desc = f"Kampány teljesítve: {campaign.title or campaign.slug or ('ID %s' % campaign.id)}"
    return grant_reward(
        user.id,
        "campaign_completed",
        source_key,
        xp_amount=xp,
        coin_amount=coins,
        campaign_id=campaign.id,
        description=desc,
        update_user_cache=True,
        user=user,
    )


# Welcome bonus for new users (once per user)
WELCOME_XP = 25
WELCOME_COINS = 50


def grant_welcome_bonus(user) -> bool:
    """
    Grant welcome reward after registration. One per user (source_key welcome_bonus:user_<id>).
    Returns True if granted, False if already had it.
    """
    source_key = f"welcome_bonus:user_{user.id}"
    return grant_reward(
        user.id,
        "welcome_bonus",
        source_key,
        xp_amount=WELCOME_XP,
        coin_amount=WELCOME_COINS,
        description="Üdvözlő jutalom új nyomozóknak",
        update_user_cache=True,
        user=user,
    )


def grant_admin_adjustment(
    user,
    xp_delta: int,
    coin_delta: int,
    *,
    admin_username: Optional[str] = None,
    description: Optional[str] = None,
) -> bool:
    """
    Record an admin adjustment of XP/coins in the reward log. Each call creates a new row.
    Use positive or negative values. Updates user cache. Caller must commit.
    Returns True when a row was created.
    """
    if xp_delta == 0 and coin_delta == 0:
        return False
    source_key = f"admin_adjustment:user_{user.id}:{uuid.uuid4().hex}"
    desc = description or "Admin módosítás"
    if admin_username:
        desc = f"{desc} (általa: {admin_username})"
    row = DetectiveRewardLog(
        user_id=user.id,
        reward_type="admin_adjustment",
        source_key=source_key,
        xp_amount=xp_delta,
        coin_amount=coin_delta,
        description=desc,
        metadata_json={"admin_username": admin_username} if admin_username else None,
    )
    db.session.add(row)
    user.xp = get_user_total_xp(user.id) + xp_delta
    user.coins = get_user_coin_balance(user.id) + coin_delta
    user.rank = get_rank_for_xp(user.xp)
    return True


# ---------- Legacy helpers (for compatibility; prefer ledger) ----------
def recalculate_user_rank(user) -> None:
    """Update user.rank from ledger total XP. Call after commit if not using grant_reward cache."""
    user.rank = get_rank_for_xp(get_user_total_xp(user.id))


def award_clue_completion_rewards(user, clue, progress_entry) -> None:
    """
    Legacy: award by writing to ledger. Caller must commit.
    Prefer grant_clue_solved_reward() and check return value for flash.
    """
    created = grant_clue_solved_reward(user, clue, campaign=getattr(progress_entry, "campaign", None))
    if not created:
        # Already had reward; still update in-memory cache from ledger so user.xp/coins stay in sync
        from flask import has_request_context
        if has_request_context():
            user.xp = get_user_total_xp(user.id)
            user.coins = get_user_coin_balance(user.id)
            user.rank = get_rank_for_xp(user.xp)


def award_campaign_completion_rewards(user, campaign, progress_entry) -> None:
    """Legacy: award by writing to ledger. Prefer grant_campaign_completed_reward()."""
    created = grant_campaign_completed_reward(user, campaign)
    if not created:
        user.xp = get_user_total_xp(user.id)
        user.coins = get_user_coin_balance(user.id)
        user.rank = get_rank_for_xp(user.xp)
