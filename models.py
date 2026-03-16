from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

# Külsőben inicializáljuk (app.py), itt csak a példány:
db = SQLAlchemy()

class DetectiveUser(UserMixin, db.Model):
    __tablename__ = "detective_user"
    __table_args__ = {"schema": "detective"}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="user", nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    avatar_url = db.Column(db.String(500), nullable=True)
    total_clues_solved = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    total_campaigns_completed = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    # Gamification
    xp = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    coins = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    rank = db.Column(db.String(50), nullable=False, default="Rookie Detective", server_default="Rookie Detective")

    def set_password(self, raw):
        self.password_hash = generate_password_hash(raw)

    def check_password(self, raw):
        return check_password_hash(self.password_hash, raw)


class DetectiveCampaign(db.Model):
    __tablename__ = "detective_campaign"
    __table_args__ = {"schema": "detective"}

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    intro = db.Column(db.Text, nullable=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    estimated_minutes = db.Column(db.Integer, nullable=True)
    distance_km = db.Column(db.Numeric(5, 2), nullable=True)
    cover_image_url = db.Column(db.String(512), nullable=True)
    start_location = db.Column(db.String(255), nullable=True)

    # Narrative
    story_goal = db.Column(db.Text, nullable=True)
    completion_message = db.Column(db.Text, nullable=True)

    # Location / discovery
    city = db.Column(db.String(100), nullable=True)
    start_lat = db.Column(db.Float, nullable=True)
    start_lng = db.Column(db.Float, nullable=True)

    # Game metadata
    category_id = db.Column(db.Integer, nullable=True)
    difficulty = db.Column(db.Integer, nullable=True)  # 1 easy, 2 medium, 3 hard
    min_age = db.Column(db.Integer, nullable=True)
    # Completion reward override (null = use difficulty-based default)
    xp_reward = db.Column(db.Integer, nullable=True)
    coins_reward = db.Column(db.Integer, nullable=True)

    # Campaign organization (quest series, for future use)
    quest_series_slug = db.Column(db.String(100), nullable=True)

    # Status
    status = db.Column(db.String(50), default="published", nullable=False, server_default="published")

    # Ownership
    created_by = db.Column(db.Integer, db.ForeignKey("detective.detective_user.id"), nullable=True)

    # Timestamps
    updated_at = db.Column(db.DateTime, nullable=True, onupdate=datetime.utcnow)

    clues = db.relationship(
        "DetectiveClue",
        backref="campaign",
        cascade="all, delete-orphan",
        order_by="DetectiveClue.order_index"
    )
    creator = db.relationship("DetectiveUser", backref=db.backref("created_campaigns", lazy="dynamic"), foreign_keys=[created_by])



class DetectiveClue(db.Model):
    __tablename__ = "detective_clue"

    id = db.Column(db.Integer, primary_key=True)
    campaign_id = db.Column(db.Integer, db.ForeignKey("detective.detective_campaign.id"), nullable=False)
    order_index = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    text = db.Column(db.Text, nullable=False)
    answer_code = db.Column(db.String(120), nullable=False)
    hint = db.Column(db.String(255), nullable=True)
    location_name = db.Column(db.String(200))
    latitude = db.Column(db.Numeric(18, 15))
    longitude = db.Column(db.Numeric(18, 15))
    # Per-clue rewards (null = use default from gamification)
    xp_reward = db.Column(db.Integer, nullable=True)
    coins_reward = db.Column(db.Integer, nullable=True)

    __table_args__ = (
        db.UniqueConstraint('campaign_id', 'order_index', name='uq_detective_clue_campaign_order'),
        {"schema": "detective"},
    )

class DetectiveProgress(db.Model):
    __tablename__ = "detective_progress"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("detective.detective_user.id"), nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey("detective.detective_campaign.id"), nullable=False)
    current_order = db.Column(db.Integer, default=1, nullable=False)
    is_finished = db.Column(db.Boolean, default=False, nullable=False)
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    finished_at = db.Column(db.DateTime, nullable=True)
    solved_orders = db.Column(db.JSON, default=list)

    user = db.relationship("DetectiveUser", backref=db.backref("progresses", lazy=True))
    campaign = db.relationship("DetectiveCampaign", backref=db.backref("progresses", lazy=True))

    __table_args__ = (
        db.UniqueConstraint('user_id', 'campaign_id', name='uq_detective_progress_user_campaign'),
        {"schema": "detective"},
    )


class Achievement(db.Model):
    __tablename__ = "achievement"
    __table_args__ = {"schema": "detective"}

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    badge_image_url = db.Column(db.String(500), nullable=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Progress criteria: e.g. clues_solved + 5 → "5 clues found"
    criteria_type = db.Column(db.String(80), nullable=True)   # e.g. "clues_solved", "campaigns_completed"
    criteria_value = db.Column(db.Integer, nullable=True)     # target number (e.g. 5, 10)


class UserAchievement(db.Model):
    __tablename__ = "user_achievement"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("detective.detective_user.id"), nullable=False)
    achievement_id = db.Column(db.Integer, db.ForeignKey("detective.achievement.id"), nullable=False)
    unlocked_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("DetectiveUser", backref=db.backref("user_achievements", lazy="dynamic"))
    achievement = db.relationship("Achievement", backref=db.backref("user_achievements", lazy="dynamic"))

    __table_args__ = (
        db.UniqueConstraint("user_id", "achievement_id", name="uq_user_achievement_user_achievement"),
        {"schema": "detective"},
    )


class DetectiveRewardLog(db.Model):
    """Ledger of all XP/coin rewards (and future debits e.g. shop). Source of truth for totals."""
    __tablename__ = "detective_reward_log"
    __table_args__ = (
        db.UniqueConstraint("source_key", name="uq_detective_reward_log_source_key"),
        db.Index("ix_detective_reward_log_user_id", "user_id"),
        db.Index("ix_detective_reward_log_created_at", "created_at"),
        db.Index("ix_detective_reward_log_reward_type", "reward_type"),
        {"schema": "detective"},
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("detective.detective_user.id"), nullable=False)
    reward_type = db.Column(db.String(50), nullable=False)
    source_key = db.Column(db.String(255), nullable=False)
    xp_amount = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    coin_amount = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    campaign_id = db.Column(db.Integer, db.ForeignKey("detective.detective_campaign.id"), nullable=True)
    clue_id = db.Column(db.Integer, db.ForeignKey("detective.detective_clue.id"), nullable=True)
    achievement_id = db.Column(db.Integer, db.ForeignKey("detective.achievement.id"), nullable=True)
    description = db.Column(db.Text, nullable=True)
    metadata_json = db.Column(db.JSON, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, server_default=db.func.now())

    user = db.relationship("DetectiveUser", backref=db.backref("reward_logs", lazy="dynamic"))
    campaign = db.relationship("DetectiveCampaign", backref=db.backref("reward_logs", lazy="dynamic"))
    clue = db.relationship("DetectiveClue", backref=db.backref("reward_logs", lazy="dynamic"))
    achievement = db.relationship("Achievement", backref=db.backref("reward_logs", lazy="dynamic"))