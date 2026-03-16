from flask import Flask, render_template
from flask_login import LoginManager, current_user
from flask_migrate import Migrate
from models import db, DetectiveUser
from config import Config

from blueprints.auth import blp as auth_bp
from blueprints.game import blp as game_bp
from blueprints.admin import blp as admin_bp
from blueprints.dashboard import blp as dashboard_bp
from blueprints.profile import blp as profile_bp



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # DB init
    db.init_app(app)

    # Migrations
    Migrate(app, db)

    # Login
    login_manager = LoginManager()
    login_manager.login_view = "auth.login"
    login_manager.login_message = "Jelentkezz be a folytatáshoz."
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(uid):
        return DetectiveUser.query.get(int(uid))

    # Blueprintek
    app.register_blueprint(auth_bp)
    app.register_blueprint(game_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(profile_bp)

    from flask_login import current_user
    from flask import redirect, url_for, render_template, session

    @app.context_processor
    def achievement_flash():
        """Provide achievement progress and newly unlocked to templates (show once after redirect)."""
        progress = session.pop("achievement_progress", None)
        newly = session.pop("newly_unlocked_achievements", None)
        return {"achievement_progress": progress, "newly_unlocked_achievements": newly or []}

    @app.context_processor
    def xp_widget_context():
        """Small XP/rank widget for navbar."""
        if not current_user.is_authenticated:
            return {"xp_widget": None}
        from services.gamification import get_next_rank_info

        xp = getattr(current_user, "xp", 0) or 0
        rank = getattr(current_user, "rank", "") or ""
        next_rank = get_next_rank_info(xp)
        return {"xp_widget": {"xp": xp, "rank": rank, "next_rank": next_rank}}

    @app.route("/")
    def index():
        if current_user.is_authenticated:
            return redirect(url_for("dashboard.dashboard"))
        return render_template("index.html")  # ez lesz a „logged-out” landing

    # Jinja filter: percek -> "X óra Y perc"
    @app.template_filter('human_minutes')
    def human_minutes_filter(minutes):
        try:
            minutes = int(minutes)
        except (ValueError, TypeError):
            return ""
        hours, mins = divmod(minutes, 60)
        parts = []
        if hours > 0:
            parts.append(f"{hours} óra")
        if mins > 0:
            parts.append(f"{mins} perc")
        return " ".join(parts) if parts else "0 perc"
    return app


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()  # MVP: Alembic helyett egyszerű induló létrehozás
        # Opcionális: hozz létre admin-t, ha nincs
        if not DetectiveUser.query.filter_by(username="admin").first():
            admin = DetectiveUser(email="admin@example.com", username="admin", role="admin")
            admin.set_password("admin1234")
            db.session.add(admin)
            db.session.commit()
    app.run(debug=True)