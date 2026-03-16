from flask import Blueprint, render_template, redirect, url_for, request, flash, abort, session
from flask_login import login_required, current_user
from models import (
    db,
    DetectiveCampaign,
    DetectiveClue,
    DetectiveProgress,
    Achievement,
    UserAchievement,
    DetectiveRewardLog,
)
from datetime import datetime
from services.gamification import (
    grant_clue_solved_reward,
    grant_campaign_completed_reward,
    get_clue_rewards,
    get_campaign_completion_rewards,
)


def _try_unlock_achievements(user):
    """If user's stats meet any achievement criteria, grant them. Returns list of newly unlocked Achievement."""
    newly = []
    for ach in Achievement.query.filter_by(is_active=True).filter(
        Achievement.criteria_type.isnot(None),
        Achievement.criteria_value.isnot(None),
    ).all():
        if UserAchievement.query.filter_by(user_id=user.id, achievement_id=ach.id).first():
            continue
        current = None
        if ach.criteria_type == "clues_solved":
            current = user.total_clues_solved
        elif ach.criteria_type == "campaigns_completed":
            current = user.total_campaigns_completed
        if current is not None and current >= ach.criteria_value:
            db.session.add(UserAchievement(user_id=user.id, achievement_id=ach.id))
            newly.append(ach)
    return newly


def _next_achievement(user, criteria_type):
    """Return (next_achievement, current_value) for this type. Next = smallest target not yet reached."""
    if criteria_type == "clues_solved":
        current = user.total_clues_solved or 0
    elif criteria_type == "campaigns_completed":
        current = user.total_campaigns_completed or 0
    else:
        return (None, 0)
    unlocked_ids = [ua.achievement_id for ua in user.user_achievements]
    next_ach = (
        Achievement.query.filter(
            Achievement.criteria_type == criteria_type,
            Achievement.is_active == True,
            Achievement.criteria_value.isnot(None),
            ~Achievement.id.in_(unlocked_ids),
            Achievement.criteria_value > current,
        )
        .order_by(Achievement.criteria_value)
        .first()
    )
    return (next_ach, current)


def _set_achievement_session(user, newly_unlocked, criteria_type):
    """Store progress toward next achievement and newly unlocked for next page (modal)."""
    def _ach_dict(a):
        d = {
            "id": a.id,
            "name": a.name,
            "description": (a.description or ""),
            "badge_image_url": (a.badge_image_url or ""),
            "criteria_type": a.criteria_type,
        }
        if a.criteria_type == "clues_solved" and a.criteria_value is not None:
            d["from_value"] = a.criteria_value - 1
            d["to_value"] = a.criteria_value
        return d

    session["newly_unlocked_achievements"] = [_ach_dict(a) for a in newly_unlocked]
    next_ach, current = _next_achievement(user, criteria_type)
    # Do not show "next achievement" progress bar for clue-based achievements
    if criteria_type == "clues_solved":
        session["achievement_progress"] = None
    elif next_ach:
        session["achievement_progress"] = {
            "current": current,
            "target": next_ach.criteria_value,
            "name": next_ach.name,
            "type": criteria_type,
        }
    else:
        session["achievement_progress"] = None

# --- add near the top of game.py ---
import unicodedata
import re

def _strip_accents(text: str) -> str:
    if not text:
        return ""
    nf = unicodedata.normalize("NFD", text)
    return "".join(ch for ch in nf if unicodedata.category(ch) != "Mn")

def _normalize_answer(text: str) -> str:
    if not text:
        return ""
    text = text.strip().casefold()
    text = _strip_accents(text)
    return re.sub(r"\s+", " ", text)


blp = Blueprint("game", __name__, url_prefix="/game")

@blp.route("/campaign/<slug>/start", methods=["GET", "POST"])
@login_required
def start_campaign(slug):
    campaign = DetectiveCampaign.query.filter_by(slug=slug, is_active=True).first_or_404()

    progress = DetectiveProgress.query.filter_by(user_id=current_user.id, campaign_id=campaign.id).first()
    if not progress:
        progress = DetectiveProgress(
            user_id=current_user.id,
            campaign_id=campaign.id,
            current_order=1,
            solved_orders=[]  # induljon üres listával
        )
        db.session.add(progress)
        db.session.commit()
        flash("Kaland elindítva! Jó nyomozást!", "success")

    total_clues = DetectiveClue.query.filter_by(campaign_id=campaign.id).count()

    # --- CSAK MEGOLDOTT NYOMOK ALAPJÁN SZÁMOLUNK ---
    solved = set(int(x) for x in (progress.solved_orders or []))
    solved_count = len(solved)

    if total_clues == 0:
        percent = 0
    elif progress.is_finished:
        percent = 100
    else:
        percent = int(solved_count / total_clues * 100)

    return render_template(
        "campaign_start.html",
        campaign=campaign,
        progress=progress,
        total_clues=total_clues,
        percent=percent,
        solved_count=solved_count,  # -> sablonnak is adjuk
    )



@blp.route("/campaign/<slug>/clue", methods=["GET", "POST"])
@login_required
def play_clue(slug):
    campaign = DetectiveCampaign.query.filter_by(slug=slug, is_active=True).first_or_404()
    progress = DetectiveProgress.query.filter_by(user_id=current_user.id, campaign_id=campaign.id).first_or_404()

    if progress.is_finished:
        flash("Ezt a nyomozást már befejezted.", "info")
        return redirect(url_for("index"))

    total_clues = DetectiveClue.query.filter_by(campaign_id=campaign.id).count()
    solved = set(progress.solved_orders or [])

    clue = DetectiveClue.query.filter_by(campaign_id=campaign.id, order_index=progress.current_order).first()
    if not clue:
        progress.is_finished = True
        progress.finished_at = datetime.utcnow()
        current_user.total_campaigns_completed = (current_user.total_campaigns_completed or 0) + 1
        campaign_reward_created = False
        if len(solved) == total_clues:
            campaign_reward_created = grant_campaign_completed_reward(current_user, campaign)
        newly = _try_unlock_achievements(current_user)
        db.session.commit()
        _set_achievement_session(current_user, newly, "campaigns_completed")
        if campaign_reward_created:
            xp, coins = get_campaign_completion_rewards(campaign)
            flash(f"Kampány teljesítve! +{xp} XP, +{coins} coin", "success")
        return redirect(url_for("index"))

    view_only = False
    jump_to = request.args.get("jump", type=int)
    if jump_to:
        if 1 <= jump_to < progress.current_order or jump_to == progress.current_order:
            clue = DetectiveClue.query.filter_by(campaign_id=campaign.id, order_index=jump_to).first_or_404()
            # Csak akkor view_only, ha tényleg megoldott nyom
            view_only = (jump_to in solved and jump_to != progress.current_order)


    if request.method == "POST":
        action = request.form.get("action")

        # Ellenőrzés
        if action == "answer":
            if clue.order_index in solved:
                flash("Ezt a nyomot már megoldottad. Az aktuális nyom következik.", "info")
                return redirect(url_for("game.play_clue", slug=slug))

            user_answer = request.form.get("answer", "")
            norm_user = _normalize_answer(user_answer)
            accepted_codes = [p.strip() for p in (clue.answer_code or "").split("|") if p.strip()]
            is_ok = any(_normalize_answer(code) == norm_user for code in accepted_codes)

            if is_ok:
                solved.add(clue.order_index)
                progress.solved_orders = sorted(solved)
                current_user.total_clues_solved = (current_user.total_clues_solved or 0) + 1
                clue_reward_created = grant_clue_solved_reward(current_user, clue, campaign=campaign)
                if clue.order_index == progress.current_order:
                    next_order = clue.order_index + 1
                    next_clue = DetectiveClue.query.filter_by(campaign_id=campaign.id, order_index=next_order).first()
                    if next_clue:
                        progress.current_order = next_order
                    else:
                        progress.is_finished = True
                        progress.finished_at = datetime.utcnow()
                        current_user.total_campaigns_completed = (current_user.total_campaigns_completed or 0) + 1
                        campaign_reward_created = False
                        if len(solved) == total_clues:
                            campaign_reward_created = grant_campaign_completed_reward(current_user, campaign)
                newly = _try_unlock_achievements(current_user)
                db.session.commit()
                if progress.is_finished:
                    _set_achievement_session(current_user, newly, "campaigns_completed")
                    if campaign_reward_created:
                        xp, coins = get_campaign_completion_rewards(campaign)
                        flash(f"Kampány teljesítve! +{xp} XP, +{coins} coin", "success")
                    return redirect(url_for("game.campaign_complete", slug=slug))
                _set_achievement_session(current_user, newly, "clues_solved")
                if clue_reward_created:
                    xp, coins = get_clue_rewards(clue)
                    flash(f"Helyes! Nyom megoldva. +{xp} XP, +{coins} coin", "success")
                return redirect(url_for("game.play_clue", slug=slug))

            else:
                flash("Nem egészen… Próbáld újra, vagy kérj tippet!", "warning")

        # Kihagyás
        elif action == "skip":
            if clue.order_index == progress.current_order:
                next_order = clue.order_index + 1
                next_clue = DetectiveClue.query.filter_by(campaign_id=campaign.id, order_index=next_order).first()
                if next_clue:
                    progress.current_order = next_order
                    db.session.commit()
                    flash("Nyom kihagyva. Tovább a következőhöz.", "info")
                    return redirect(url_for("game.play_clue", slug=slug))
                else:
                    progress.is_finished = True
                    progress.finished_at = datetime.utcnow()
                    current_user.total_campaigns_completed = (current_user.total_campaigns_completed or 0) + 1
                    campaign_reward_created = False
                    if len(solved) == total_clues:
                        campaign_reward_created = grant_campaign_completed_reward(current_user, campaign)
                    newly = _try_unlock_achievements(current_user)
                    db.session.commit()
                    _set_achievement_session(current_user, newly, "campaigns_completed")
                    if campaign_reward_created:
                        xp, coins = get_campaign_completion_rewards(campaign)
                        flash(f"Kampány teljesítve! +{xp} XP, +{coins} coin", "success")
                    return redirect(url_for("game.campaign_complete", slug=slug))

    # Render adatok
    # feloldott indexek: minden eddig elért (1..current-1) + aktuális
    # minden elért nyom indexe (1..current-1)
    visited_indexes = set(range(1, progress.current_order))
    # feloldott indexek = minden eddig elért + aktuális
    unlocked_indexes = sorted(visited_indexes | {0, progress.current_order})

    # kihagyottak = elért, de nem megoldott
    skipped_indexes = visited_indexes - solved

    completed_count = len(solved)
    percent = int(completed_count / total_clues * 100) if total_clues else 0

    clue_xp, clue_coins = get_clue_rewards(clue)

    # A jutalom csak akkor jár (és csak akkor mutatjuk), ha még nincs ledger-bejegyzés erre a nyomra
    has_clue_reward = (
        DetectiveRewardLog.query.filter_by(
            user_id=current_user.id,
            reward_type="clue_solved",
            clue_id=clue.id,
        ).first()
        is not None
    )
    can_earn_clue_reward = not has_clue_reward

    return render_template(
        "clue.html",
        campaign=campaign,
        clue=clue,
        progress=progress,
        total_clues=total_clues,
        percent=percent,
        view_only=view_only,
        unlocked_indexes=unlocked_indexes,
        skipped_indexes=skipped_indexes,
        solved_indexes=solved,
        clue_xp=clue_xp,
        clue_coins=clue_coins,
        can_earn_clue_reward=can_earn_clue_reward,
    )






@blp.route("/campaign/<slug>/complete")
@login_required
def campaign_complete(slug):
    """Show the completion message (assembled story) after the player finishes the campaign."""
    campaign = DetectiveCampaign.query.filter_by(slug=slug, is_active=True).first_or_404()
    progress = DetectiveProgress.query.filter_by(user_id=current_user.id, campaign_id=campaign.id).first()
    if not progress or not progress.is_finished:
        flash("Ezt a kampányt még nem fejezted be, vagy még nem kezdted el.", "info")
        return redirect(url_for("game.start_campaign", slug=slug))

    # Narrative: primary completion message (campaign-specific, else fallback)
    completion_message = (campaign.completion_message or "").strip()
    if not completion_message:
        completion_message = (
            "Gratulálunk! Sikeresen végigjártad a nyomozás állomásait, "
            "megfejtetted a rejtélyeket, és feltártad a kampány titkait. "
            "A nyomok most már összeálltak, az ügyet sikeresen lezártad."
        )

    # Mission stats
    total_clues = DetectiveClue.query.filter_by(campaign_id=campaign.id).count()
    solved_orders = set(progress.solved_orders or [])
    solved_clues_count = len(solved_orders)

    # Clue list for "Mikre derült fény?" + térképes polygon (felfedett nyomok)
    ordered_clues = (
        DetectiveClue.query.filter_by(campaign_id=campaign.id)
        .order_by(DetectiveClue.order_index)
        .all()
    )
    discovery_clues = [
        {
            "title": clue.title,
            "status": "solved" if clue.order_index in solved_orders else "in_progress",
            "lat": float(clue.latitude) if getattr(clue, "latitude", None) is not None else None,
            "lng": float(clue.longitude) if getattr(clue, "longitude", None) is not None else None,
        }
        for clue in ordered_clues
    ]

    # Reward visibility: was campaign completion reward actually granted?
    reward_xp = reward_coins = None
    reward_granted = False
    if current_user.is_authenticated:
        from models import DetectiveRewardLog  # local import to avoid circulars at top-level

        ledger_row = (
            DetectiveRewardLog.query.filter_by(
                user_id=current_user.id,
                campaign_id=campaign.id,
                reward_type="campaign_completed",
            )
            .order_by(DetectiveRewardLog.created_at.desc())
            .first()
        )
        if ledger_row:
            reward_granted = True
            # Prefer stored amounts; fall back to configured rewards if somehow zero
            reward_xp = ledger_row.xp_amount
            reward_coins = ledger_row.coin_amount
            if (reward_xp or 0) <= 0 or (reward_coins or 0) < 0:
                reward_xp, reward_coins = get_campaign_completion_rewards(campaign)

    # Narrative "Mit fedeztél fel?" summary
    discovery_summary = None
    for field in (campaign.story_goal, campaign.intro, campaign.description):
        text = (field or "").strip()
        if text:
            discovery_summary = text
            break
    if not discovery_summary:
        discovery_summary = (
            "A nyomozás során végigjártad a kampány fontos helyszíneit, "
            "megfejtetted az egyes állomások feladványait, és sikeresen "
            "feltártad a történet végső megoldását."
        )

    return render_template(
        "campaign_complete.html",
        campaign=campaign,
        completion_message=completion_message,
        total_clues=total_clues,
        solved_clues_count=solved_clues_count,
        distance_km=campaign.distance_km,
        estimated_minutes=campaign.estimated_minutes,
        reward_granted=reward_granted,
        reward_xp=reward_xp,
        reward_coins=reward_coins,
        discovery_summary=discovery_summary,
        discovery_clues=discovery_clues,
    )


@blp.route("/campaign/<slug>/reset", methods=["POST"])
@login_required
def reset_campaign(slug):
    campaign = DetectiveCampaign.query.filter_by(slug=slug, is_active=True).first_or_404()
    progress = DetectiveProgress.query.filter_by(user_id=current_user.id, campaign_id=campaign.id).first()

    if progress:
        current_user.total_clues_solved = max(0, (current_user.total_clues_solved or 0) - len(progress.solved_orders or []))
        if progress.is_finished:
            current_user.total_campaigns_completed = max(0, (current_user.total_campaigns_completed or 0) - 1)
        progress.current_order = 1
        progress.is_finished = False
        progress.started_at = datetime.utcnow()
        progress.finished_at = None
        progress.solved_orders = []
        db.session.commit()
        flash("Kampány újrakezdve. Hajrá!", "info")
    else:
        # Ha még nem is kezdte el, létrehozunk egy kezdő sort
        progress = DetectiveProgress(
            user_id=current_user.id,
            campaign_id=campaign.id,
            current_order=1,
            is_finished=False,
            started_at=datetime.utcnow(),
            solved_orders=[], 
        )
        db.session.add(progress)
        db.session.commit()
        flash("Kampány elindítva.", "success")

    return redirect(url_for('game.start_campaign', slug=slug))


@blp.route("/campaign/<slug>/intro")
@login_required
def campaign_intro(slug):
    campaign = DetectiveCampaign.query.filter_by(slug=slug, is_active=True).first_or_404()
    progress = DetectiveProgress.query.filter_by(user_id=current_user.id, campaign_id=campaign.id).first()

    total = DetectiveClue.query.filter_by(campaign_id=campaign.id).count()
    solved_count = 0
    percent = 0
    is_finished = False

    if progress and total > 0:
        solved_count = len(progress.solved_orders or [])
        is_finished = bool(progress.is_finished)
        percent = 100 if is_finished else int(solved_count / total * 100)

    return render_template(
        "campaign_intro.html",
        campaign=campaign,
        total_clues=total,
        solved_count=solved_count,
        percent=percent,
        is_finished=is_finished,
    )

