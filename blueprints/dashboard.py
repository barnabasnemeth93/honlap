# blueprints/dashboard.py
from flask import Blueprint, render_template
from flask_login import current_user
from models import db, DetectiveCampaign, DetectiveClue, DetectiveProgress
from services.gamification import (
    get_clue_rewards,
    get_campaign_completion_rewards,
    get_difficulty_display,
)

blp = Blueprint("dashboard", __name__, url_prefix="")


# Ajánlott első játék: Budapest városligeti nyomozó (id=8)
RECOMMENDED_FIRST_CAMPAIGN_ID = 8


def _recommended_first_campaign(user_id):
    """
    Ajánlott első játék: id=8 (Budapest városligeti nyomozó), ha aktív; különben
    első aktív kampány nehézség szerint.
    """
    preferred = DetectiveCampaign.query.filter_by(
        id=RECOMMENDED_FIRST_CAMPAIGN_ID, is_active=True
    ).first()
    if preferred:
        return preferred
    return (
        DetectiveCampaign.query.filter_by(is_active=True)
        .order_by(DetectiveCampaign.difficulty.asc().nulls_last(), DetectiveCampaign.id.asc())
        .first()
    )


def _progress_for(user_id, campaign_id):
    """(completed, total, percent, is_finished, current_order) – completed a solved_orders alapján."""
    total = DetectiveClue.query.filter_by(campaign_id=campaign_id).count()
    if not user_id or total == 0:
        return 0, total, 0, False, 1

    prog = DetectiveProgress.query.filter_by(user_id=user_id, campaign_id=campaign_id).first()
    if not prog:
        return 0, total, 0, False, 1

    solved_count = len(prog.solved_orders or [])
    if prog.is_finished:
        return total, total, 100, True, prog.current_order or 1

    percent = int(solved_count / total * 100) if total else 0
    return solved_count, total, percent, False, (prog.current_order or 1)

@blp.route("/dashboard")
def dashboard():
    campaigns = DetectiveCampaign.query.filter_by(is_active=True).all()
    cards = []
    uid = current_user.id if getattr(current_user, "is_authenticated", False) else None

    for c in campaigns:
        completed, total, percent, is_finished, current_order = _progress_for(uid, c.id)

        prog = DetectiveProgress.query.filter_by(user_id=uid, campaign_id=c.id).first() if uid else None
        solved_count = len(prog.solved_orders or []) if prog else 0

        # has_progress csak akkor igaz, ha tényleg van előrehaladás
        has_progress = bool(
            prog and (
                is_finished or
                current_order > 1 or
                solved_count > 0
            )
        )

        # Nehézség vizuális megjelenítés (egységes helperből)
        difficulty_label = get_difficulty_display(c.difficulty) if c.difficulty else None

        # Reward preview: összes clue reward + campaign completion reward
        clue_xp_total = 0
        clue_coins_total = 0
        if total > 0:
            clues = DetectiveClue.query.filter_by(campaign_id=c.id).all()
            for clue in clues:
                cxp, ccoins = get_clue_rewards(clue)
                clue_xp_total += int(cxp or 0)
                clue_coins_total += int(ccoins or 0)

        camp_xp, camp_coins = get_campaign_completion_rewards(c)
        total_xp = clue_xp_total + int(camp_xp or 0)
        total_coins = clue_coins_total + int(camp_coins or 0)

        # Sorrend: Folyamatban (0), Megoldatlan (1), Megoldott (2)
        if is_finished:
            status_order = 2
            status_key = "megoldott"
        elif has_progress:
            status_order = 0
            status_key = "folyamatban"
        else:
            status_order = 1
            status_key = "megoldatlan"

        city_val = getattr(c, "city", None)
        cards.append({
            "id": c.id,
            "slug": c.slug,
            "title": c.title,
            "description": c.description,
            "intro": getattr(c, "intro", None),
            "story_goal": getattr(c, "story_goal", None),
            "total": total,
            "completed": completed,
            "percent": percent,
            "is_finished": is_finished,
            "current_order": current_order,
            "has_progress": has_progress,
            "status_order": status_order,
            "status_key": status_key,
            "estimated_minutes": c.estimated_minutes,
            "distance_km": float(c.distance_km) if c.distance_km is not None else None,
            "cover_image_url": getattr(c, "cover_image_url", None),
            "start_location": getattr(c, "start_location", None),
            "start_lat": getattr(c, "start_lat", None),
            "start_lng": getattr(c, "start_lng", None),
            "city": city_val,
            "difficulty": c.difficulty,
            "difficulty_label": difficulty_label,
            "clue_xp_total": clue_xp_total,
            "clue_coins_total": clue_coins_total,
            "campaign_xp_reward": camp_xp,
            "campaign_coin_reward": camp_coins,
            "total_xp_reward": total_xp,
            "total_coin_reward": total_coins,
            "min_age": getattr(c, "min_age", None),
            "quest_series_slug": getattr(c, "quest_series_slug", None),
        })

    # Rendezés: Folyamatban, Megoldatlan, Megoldott; majd cím
    cards.sort(key=lambda x: (x["status_order"], (x["title"] or "").lower()))
    unique_cities = sorted({c["city"] for c in cards if c.get("city")}, key=lambda s: (s or "").lower()) if cards else []

    recommended_campaign = None
    show_recommendation = False
    if uid:
        progress_count = DetectiveProgress.query.filter_by(user_id=uid).count()
        if progress_count == 0:
            recommended_campaign = _recommended_first_campaign(uid)
            show_recommendation = recommended_campaign is not None

    return render_template(
        "dashboard.html",
        cards=cards,
        unique_cities=unique_cities,
        recommended_campaign=recommended_campaign,
        show_recommendation=show_recommendation,
    )
