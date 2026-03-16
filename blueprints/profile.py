# blueprints/profile.py
from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from models import db, Achievement
from services.gamification import (
    get_rank_for_xp,
    get_next_rank_info,
    get_user_total_xp,
    get_user_coin_balance,
    get_user_reward_log,
)
import os, uuid

blp = Blueprint("profile", __name__, url_prefix="")

ALLOWED_EXTS = {"png", "jpg", "jpeg", "webp"}
MAX_SIZE = 2 * 1024 * 1024  # 2 MB

def _allowed(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTS

@blp.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    if request.method == "POST":
        action = request.form.get("action", "")
        if action == "remove":
            current_user.avatar_url = None
            db.session.commit()
            flash("Avatar eltávolítva.", "info")
            return redirect(url_for("profile.profile"))

        if action == "set_dicebear":
            url = (request.form.get("avatar_url") or "").strip()
            if not url:
                flash("Nem adtál meg avatart.", "warning")
                return redirect(url_for("profile.profile"))

            # optional: validate it's a DiceBear adventurer URL
            if "api.dicebear.com/6.x/adventurer/svg" not in url:
                flash("Csak DiceBear (Adventurer) avatar választható ezen az oldalon.", "warning")
                return redirect(url_for("profile.profile"))

            current_user.avatar_url = url
            db.session.commit()
            flash("Avatar frissítve!", "success")
            return redirect(url_for("profile.profile"))

    # Stats for profile
    stats = {
        "clues_solved": current_user.total_clues_solved or 0,
        "campaigns_completed": current_user.total_campaigns_completed or 0,
    }
    # Gamification: rank, XP, coins from reward ledger (source of truth)
    current_xp = get_user_total_xp(current_user.id)
    current_coins = get_user_coin_balance(current_user.id)
    current_rank = get_rank_for_xp(current_xp)
    next_rank_info = get_next_rank_info(current_xp)
    if next_rank_info:
        xp_in_tier = next_rank_info.get("xp_in_tier") or 1
        xp_current_in_tier = next_rank_info.get("xp_current") or 0
        xp_progress_percent = max(0, min(100, int(xp_current_in_tier / xp_in_tier * 100)))
        gamification = {
            "current_rank": current_rank,
            "current_xp": current_xp,
            "current_coins": current_coins,
            "next_rank_name": next_rank_info["name"],
            "next_rank_xp": next_rank_info["xp_required"],
            "xp_to_next": next_rank_info["xp_needed"],
            "xp_in_tier": next_rank_info["xp_in_tier"],
            "xp_progress_percent": xp_progress_percent,
            "is_max_rank": False,
        }
    else:
        gamification = {
            "current_rank": current_rank,
            "current_xp": current_xp,
            "current_coins": current_coins,
            "next_rank_name": None,
            "next_rank_xp": None,
            "xp_to_next": 0,
            "xp_in_tier": 0,
            "xp_progress_percent": 100,
            "is_max_rank": True,
        }
    reward_log_entries = get_user_reward_log(current_user.id, limit=30)
    # Achievements with progress: flat lists for Completed / Incomplete toggle
    unlocked_achievement_ids = {ua.achievement_id for ua in current_user.user_achievements}
    achievements_completed = []
    achievements_incomplete = []
    for ach in Achievement.query.filter_by(is_active=True).order_by(Achievement.criteria_type, Achievement.criteria_value).all():
        current_value = None
        if ach.criteria_type == "clues_solved":
            current_value = current_user.total_clues_solved or 0
        elif ach.criteria_type == "campaigns_completed":
            current_value = current_user.total_campaigns_completed or 0
        item = {
            "achievement": ach,
            "unlocked": ach.id in unlocked_achievement_ids,
            "current_value": current_value,
            "target_value": ach.criteria_value,
        }
        if item["unlocked"]:
            achievements_completed.append(item)
        else:
            achievements_incomplete.append(item)

    return render_template(
        "profile.html",
        stats=stats,
        gamification=gamification,
        reward_log_entries=reward_log_entries,
        achievements_completed=achievements_completed,
        achievements_incomplete=achievements_incomplete,
    )

