from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from models import db, DetectiveUser
from services.gamification import grant_welcome_bonus
from urllib.parse import quote

blp = Blueprint("auth", __name__, url_prefix="/auth")

def dicebear_url(style: str, seed: str) -> str:
    style = style or "bottts"
    seed = seed or "guest"
    return f"https://api.dicebear.com/6.x/{style}/svg?seed={quote(seed)}"

@blp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        avatar_url = request.form.get("avatar_url", "").strip()

        if not email or not username or not password:
            flash("Minden mező kitöltése kötelező.", "danger")
            return render_template("register.html")

        # unique check
        if DetectiveUser.query.filter(
            (DetectiveUser.email == email) | (DetectiveUser.username == username)
        ).first():
            flash("Ezzel az emaillel vagy felhasználónévvel már létezik fiók.", "warning")
            return render_template("register.html")

        # Fallback: generate avatar if not provided (use username + default style)
        if not avatar_url:
            avatar_url = dicebear_url("bottts", username or "guest")

        user = DetectiveUser(email=email, username=username, avatar_url=avatar_url)
        user.set_password(password)
        db.session.add(user)
        db.session.flush()  # get user.id for welcome bonus
        grant_welcome_bonus(user)
        db.session.commit()

        login_user(user)
        flash("Üdv a Városnyomozóban! Megkaptad az induló jutalmad: +25 XP, +50 coin.", "success")
        return redirect(url_for("dashboard.dashboard"))

    return render_template("register.html")


@blp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        user = DetectiveUser.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user)
            flash("Sikeres bejelentkezés.", "success")
            return redirect(url_for("index"))
        flash("Hibás felhasználónév vagy jelszó.", "danger")
    return render_template("login.html")


@blp.route("/logout")
@login_required
def logout():
    logout_user()
    flash("Kijelentkeztél.", "info")
    return redirect(url_for("index"))
