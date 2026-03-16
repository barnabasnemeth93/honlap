"""reward log ledger (DetectiveRewardLog)

Revision ID: e9f1a2b3c4d5
Revises: d8e5a3f1b2c9
Create Date: 2026-03-14

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = 'e9f1a2b3c4d5'
down_revision = 'd8e5a3f1b2c9'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'detective_reward_log',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('reward_type', sa.String(length=50), nullable=False),
        sa.Column('source_key', sa.String(length=255), nullable=False),
        sa.Column('xp_amount', sa.Integer(), nullable=False, server_default=sa.text('0')),
        sa.Column('coin_amount', sa.Integer(), nullable=False, server_default=sa.text('0')),
        sa.Column('campaign_id', sa.Integer(), nullable=True),
        sa.Column('clue_id', sa.Integer(), nullable=True),
        sa.Column('achievement_id', sa.Integer(), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('metadata_json', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('source_key', name='uq_detective_reward_log_source_key'),
        sa.ForeignKeyConstraint(['user_id'], ['detective.detective_user.id']),
        sa.ForeignKeyConstraint(['campaign_id'], ['detective.detective_campaign.id']),
        sa.ForeignKeyConstraint(['clue_id'], ['detective.detective_clue.id']),
        sa.ForeignKeyConstraint(['achievement_id'], ['detective.achievement.id']),
        schema='detective'
    )
    op.create_index('ix_detective_reward_log_user_id', 'detective_reward_log', ['user_id'], schema='detective')
    op.create_index('ix_detective_reward_log_created_at', 'detective_reward_log', ['created_at'], schema='detective')
    op.create_index('ix_detective_reward_log_reward_type', 'detective_reward_log', ['reward_type'], schema='detective')


def downgrade():
    op.drop_index('ix_detective_reward_log_reward_type', table_name='detective_reward_log', schema='detective')
    op.drop_index('ix_detective_reward_log_created_at', table_name='detective_reward_log', schema='detective')
    op.drop_index('ix_detective_reward_log_user_id', table_name='detective_reward_log', schema='detective')
    op.drop_table('detective_reward_log', schema='detective')
