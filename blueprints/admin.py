from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user
from models import db, DetectiveCampaign, DetectiveClue, DetectiveProgress, DetectiveUser, Achievement, UserAchievement
from services.gamification import grant_admin_adjustment, get_user_total_xp, get_user_coin_balance


def _campaign_form_data(form):
    """Extract campaign fields from request form. Returns dict suitable for create/update."""
    def _int(v):
        if v is None or (isinstance(v, str) and not v.strip()):
            return None
        try:
            return int(v)
        except (ValueError, TypeError):
            return None

    def _float(v):
        if v is None or (isinstance(v, str) and not v.strip()):
            return None
        try:
            return float(v)
        except (ValueError, TypeError):
            return None

    def _str(v):
        if v is None:
            return None
        s = (v or "").strip()
        return s if s else None

    return {
        "title": (form.get("title") or "").strip() or None,
        "slug": (form.get("slug") or "").strip().lower() or None,
        "description": _str(form.get("description")),
        "intro": _str(form.get("intro")),
        "story_goal": _str(form.get("story_goal")),
        "completion_message": _str(form.get("completion_message")),
        "cover_image_url": _str(form.get("cover_image_url")),
        "start_location": _str(form.get("start_location")),
        "city": _str(form.get("city")),
        "start_lat": _float(form.get("start_lat")),
        "start_lng": _float(form.get("start_lng")),
        "estimated_minutes": _int(form.get("estimated_minutes")),
        "distance_km": _float(form.get("distance_km")),
        "category_id": _int(form.get("category_id")),
        "difficulty": _int(form.get("difficulty")),
        "min_age": _int(form.get("min_age")),
        "xp_reward": _int(form.get("xp_reward")),
        "coins_reward": _int(form.get("coins_reward")),
        "quest_series_slug": _str(form.get("quest_series_slug")),
        "status": _str(form.get("status")) or "published",
        "is_active": form.get("is_active") == "1",
    }


blp = Blueprint("admin", __name__, url_prefix="/admin")


def admin_required():
    return current_user.is_authenticated and current_user.role == "admin"


@blp.before_request
def restrict_to_admin():
    if not admin_required():
        flash("Nincs jogosultságod az admin felülethez.", "danger")
        return redirect(url_for("index"))


@blp.route("/")
@blp.route("/index")
@login_required
def index():
    """Main admin dashboard: navigate to campaigns, achievements, etc."""
    return render_template("admin_index.html")


@blp.route("/players")
@login_required
def players():
    """List all players with their details (no password) and progress per campaign."""
    users = DetectiveUser.query.order_by(DetectiveUser.created_at.desc()).all()
    players_data = []
    for u in users:
        progress_list = []
        for prog in DetectiveProgress.query.filter_by(user_id=u.id).order_by(DetectiveProgress.started_at.desc()).all():
            campaign = DetectiveCampaign.query.get(prog.campaign_id)
            total_clues = DetectiveClue.query.filter_by(campaign_id=prog.campaign_id).count() if campaign else 0
            solved_count = len(prog.solved_orders or [])
            percent = int(solved_count / total_clues * 100) if total_clues else 0
            progress_list.append({
                "campaign_id": prog.campaign_id,
                "campaign_title": campaign.title if campaign else "—",
                "campaign_slug": campaign.slug if campaign else None,
                "current_order": prog.current_order,
                "is_finished": prog.is_finished,
                "solved_count": solved_count,
                "total_clues": total_clues,
                "percent": percent,
                "started_at": prog.started_at,
                "finished_at": prog.finished_at,
            })
        players_data.append({
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "role": u.role,
            "created_at": u.created_at,
            "avatar_url": u.avatar_url,
            "total_clues_solved": u.total_clues_solved or 0,
            "total_campaigns_completed": u.total_campaigns_completed or 0,
            "xp": get_user_total_xp(u.id),
            "coins": get_user_coin_balance(u.id),
            "progress": progress_list,
        })
    return render_template("admin_players.html", players=players_data)


@blp.route("/users/<int:uid>/edit", methods=["GET", "POST"])
@login_required
def edit_user(uid):
    """Edit a user's email, username, and role (admin only)."""
    user = DetectiveUser.query.get_or_404(uid)
    if request.method == "POST":
        username = (request.form.get("username") or "").strip()
        email = (request.form.get("email") or "").strip()
        role = (request.form.get("role") or "").strip().lower()

        if not username or not email:
            flash("Felhasználónév és e-mail kötelező.", "danger")
        elif role not in ("user", "admin"):
            flash("Érvénytelen szerepkör.", "danger")
        else:
            other_username = DetectiveUser.query.filter_by(username=username).first()
            if other_username and other_username.id != user.id:
                flash("A felhasználónév már foglalt.", "warning")
            else:
                other_email = DetectiveUser.query.filter_by(email=email).first()
                if other_email and other_email.id != user.id:
                    flash("Az e-mail cím már használatban van.", "warning")
                else:
                    user.username = username
                    user.email = email
                    user.role = role
                    # Optional XP/coin adjustment (logged in reward ledger)
                    xp_adj = request.form.get("xp_adjustment")
                    coin_adj = request.form.get("coin_adjustment")
                    try:
                        xp_delta = int(xp_adj) if xp_adj not in (None, "") else 0
                    except ValueError:
                        xp_delta = 0
                    try:
                        coin_delta = int(coin_adj) if coin_adj not in (None, "") else 0
                    except ValueError:
                        coin_delta = 0
                    adjustment_made = False
                    if xp_delta != 0 or coin_delta != 0:
                        adjustment_made = grant_admin_adjustment(
                            user,
                            xp_delta,
                            coin_delta,
                            admin_username=current_user.username,
                        )
                    db.session.commit()
                    if adjustment_made:
                        flash("Felhasználó mentve. XP/érme módosítás rögzítve a naplóban.", "success")
                    else:
                        flash("Felhasználó mentve.", "success")
                    return redirect(url_for("admin.players"))
    return render_template("admin_user_edit.html", user=user)


# Password required in request body to confirm user deletion (admin safety).
DELETE_USER_CONFIRM_PASSWORD = "Katica33"


@blp.route("/users/<int:uid>/delete", methods=["POST"])
@login_required
def delete_user(uid):
    """Delete a user and their progress/achievements (admin only)."""
    user = DetectiveUser.query.get_or_404(uid)
    if user.id == current_user.id:
        flash("Saját fiókot nem törölhetsz itt.", "danger")
        return redirect(url_for("admin.players"))
    if (getattr(user, "role", None) or "").lower() == "admin":
        flash("Admin felhasználót nem törölhetsz.", "danger")
        return redirect(url_for("admin.players"))
    if request.form.get("delete_confirm_password") != DELETE_USER_CONFIRM_PASSWORD:
        flash("A törléshez meg kell adni a helyes jelszót.", "danger")
        return redirect(url_for("admin.players"))
    UserAchievement.query.filter_by(user_id=user.id).delete()
    DetectiveProgress.query.filter_by(user_id=user.id).delete()
    db.session.delete(user)
    db.session.commit()
    flash("Felhasználó törölve.", "info")
    return redirect(url_for("admin.players"))


@blp.route("/campaigns", methods=["GET", "POST"])
@login_required
def campaigns():
    if request.method == "POST":
        data = _campaign_form_data(request.form)
        if not data.get("title") or not data.get("slug"):
            flash("Cím és slug kötelező.", "danger")
        else:
            if DetectiveCampaign.query.filter_by(slug=data["slug"]).first():
                flash("Már létezik ilyen slug.", "warning")
            else:
                c = DetectiveCampaign(**data)
                db.session.add(c)
                db.session.commit()
                flash("Kampány létrehozva.", "success")
                return redirect(url_for("admin.campaigns"))

    campaigns = DetectiveCampaign.query.order_by(DetectiveCampaign.created_at.desc()).all()
    return render_template("admin_campaigns.html", campaigns=campaigns)


@blp.route("/achievements", methods=["GET", "POST"])
@login_required
def achievements():
    if request.method == "POST":
        name = (request.form.get("name") or "").strip()
        slug = (request.form.get("slug") or "").strip().lower()
        description = (request.form.get("description") or "").strip() or None
        badge_image_url = (request.form.get("badge_image_url") or "").strip() or None
        criteria_type = (request.form.get("criteria_type") or "").strip() or None
        criteria_value = request.form.get("criteria_value")
        criteria_value = int(criteria_value) if criteria_value and criteria_value.strip() else None

        if not name or not slug:
            flash("Név és slug kötelező.", "danger")
        else:
            exists = Achievement.query.filter_by(slug=slug).first()
            if exists:
                flash("Már létezik ilyen slug.", "warning")
            else:
                ach = Achievement(
                    name=name,
                    slug=slug,
                    description=description,
                    badge_image_url=badge_image_url,
                    criteria_type=criteria_type,
                    criteria_value=criteria_value,
                )
                db.session.add(ach)
                db.session.commit()
                flash("Achievement létrehozva.", "success")
                return redirect(url_for("admin.achievements"))

    achievements = Achievement.query.order_by(Achievement.created_at.desc()).all()
    return render_template("admin_achievements.html", achievements=achievements)


@blp.route("/achievements/<int:aid>/toggle")
@login_required
def toggle_achievement(aid):
    ach = Achievement.query.get_or_404(aid)
    ach.is_active = not ach.is_active
    db.session.commit()
    flash("Achievement állapota frissítve.", "info")
    return redirect(url_for("admin.achievements"))



@blp.route("/campaigns/<int:cid>/toggle")
@login_required
def toggle_campaign(cid):
    c = DetectiveCampaign.query.get_or_404(cid)
    c.is_active = not c.is_active
    db.session.commit()
    flash("Állapot frissítve.", "info")
    return redirect(url_for("admin.campaigns"))


@blp.route("/campaigns/<int:cid>/edit", methods=["GET", "POST"])
@login_required
def edit_campaign(cid):
    campaign = DetectiveCampaign.query.get_or_404(cid)
    if request.method == "POST":
        data = _campaign_form_data(request.form)
        if not data.get("title") or not data.get("slug"):
            flash("Cím és slug kötelező.", "danger")
        else:
            other = DetectiveCampaign.query.filter_by(slug=data["slug"]).first()
            if other and other.id != campaign.id:
                flash("Már létezik ilyen slug.", "warning")
            else:
                for key, value in data.items():
                    setattr(campaign, key, value)
                db.session.commit()
                flash("Kampány mentve.", "success")
                return redirect(url_for("admin.campaigns"))
    return render_template("admin_campaign_edit.html", campaign=campaign)


@blp.route("/campaigns/<int:cid>/delete", methods=["GET", "POST"])
@login_required
def delete_campaign(cid):
    campaign = DetectiveCampaign.query.get_or_404(cid)
    if request.method == "POST":
        db.session.delete(campaign)
        db.session.commit()
        flash("Kampány törölve.", "info")
        return redirect(url_for("admin.campaigns"))
    return render_template("admin_campaign_confirm_delete.html", campaign=campaign)


@blp.route("/clues/<int:cid>", methods=["GET", "POST"])
@login_required
def clues(cid):
    campaign = DetectiveCampaign.query.get_or_404(cid)

    if request.method == "POST":
        title = request.form.get("title", "").strip()
        text = request.form.get("text", "").strip()
        answer_code = request.form.get("answer_code", "").strip()
        order_index = int(request.form.get("order_index", "1"))
        hint = (request.form.get("hint") or "").strip() or None
        xp_reward = request.form.get("xp_reward")
        coins_reward = request.form.get("coins_reward")
        xp_reward = int(xp_reward) if xp_reward not in (None, "") else None
        coins_reward = int(coins_reward) if coins_reward not in (None, "") else None

        location_name = (request.form.get("location_name") or "").strip() or None
        lat = request.form.get("latitude")
        lng = request.form.get("longitude")
        latitude = float(lat) if lat else None
        longitude = float(lng) if lng else None

        if not title or not text or not answer_code:
            flash("Cím, szöveg és megoldókód kötelező.", "danger")
        else:
            clue = DetectiveClue(
                campaign_id=campaign.id,
                order_index=order_index,
                title=title,
                text=text,
                answer_code=answer_code,
                hint=hint,
                location_name=location_name,
                latitude=latitude,
                longitude=longitude,
                xp_reward=xp_reward,
                coins_reward=coins_reward,
            )
            db.session.add(clue)
            try:
                db.session.commit()
                flash("Nyom hozzáadva.", "success")
            except Exception:
                db.session.rollback()
                flash("Ütköző sorszám – módosítsd az order_index értéket.", "warning")
        return redirect(url_for("admin.clues", cid=campaign.id))

    clues = (DetectiveClue.query
             .filter_by(campaign_id=campaign.id)
             .order_by(DetectiveClue.order_index)
             .all())
    return render_template("admin_clues.html", campaign=campaign, clues=clues)

@blp.route("/clue/<int:clue_id>/edit", methods=["GET", "POST"])
@login_required
def edit_clue(clue_id):
    clue = DetectiveClue.query.get_or_404(clue_id)
    campaign = DetectiveCampaign.query.get_or_404(clue.campaign_id)

    if request.method == "POST":
        clue.order_index = int(request.form.get("order_index", clue.order_index))
        clue.title = request.form.get("title", clue.title).strip()
        clue.text = request.form.get("text", clue.text).strip()
        clue.answer_code = request.form.get("answer_code", clue.answer_code).strip()
        clue.hint = (request.form.get("hint") or "").strip() or None
        xp_reward = request.form.get("xp_reward")
        coins_reward = request.form.get("coins_reward")
        clue.xp_reward = int(xp_reward) if xp_reward not in (None, "") else None
        clue.coins_reward = int(coins_reward) if coins_reward not in (None, "") else None

        clue.location_name = (request.form.get("location_name") or "").strip() or None
        lat = request.form.get("latitude")
        lng = request.form.get("longitude")
        clue.latitude = float(lat) if lat else None
        clue.longitude = float(lng) if lng else None

        try:
            db.session.commit()
            flash("Nyom frissítve.", "success")
            return redirect(url_for("admin.clues", cid=campaign.id))
        except Exception:
            db.session.rollback()
            flash("Sorszám ütközés vagy érvénytelen adat.", "danger")

    return render_template("admin_clue_edit.html", campaign=campaign, clue=clue)



@blp.route("/clues/<int:clue_id>/delete")
@login_required
def delete_clue(clue_id):
    clue = DetectiveClue.query.get_or_404(clue_id)
    cid = clue.campaign_id
    db.session.delete(clue)
    db.session.commit()
    flash("Nyom törölve.", "info")
    return redirect(url_for("admin.clues", cid=cid))