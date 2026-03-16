"""add campaign metadata columns

Revision ID: b2c8e9a1d4f3
Revises: 6fa98531dd2f
Create Date: 2026-03-14

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b2c8e9a1d4f3'
down_revision = '6fa98531dd2f'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('detective_campaign', schema=None) as batch_op:
        # Narrative
        batch_op.add_column(sa.Column('story_goal', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('completion_message', sa.Text(), nullable=True))
        # Location / discovery
        batch_op.add_column(sa.Column('city', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('start_lat', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('start_lng', sa.Float(), nullable=True))
        # Game metadata
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('difficulty', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('min_age', sa.Integer(), nullable=True))
        # Campaign organization
        batch_op.add_column(sa.Column('quest_series_slug', sa.String(length=100), nullable=True))
        # Status
        batch_op.add_column(sa.Column('status', sa.String(length=50), nullable=False, server_default='published'))
        # Ownership
        batch_op.add_column(sa.Column('created_by', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            'fk_detective_campaign_created_by',
            'detective_user', ['created_by'], ['id'],
            referent_schema='detective'
        )
        # Timestamps
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))


def downgrade():
    with op.batch_alter_table('detective_campaign', schema=None) as batch_op:
        batch_op.drop_constraint('fk_detective_campaign_created_by', type_='foreignkey')
        batch_op.drop_column('updated_at')
        batch_op.drop_column('created_by')
        batch_op.drop_column('status')
        batch_op.drop_column('quest_series_slug')
        batch_op.drop_column('min_age')
        batch_op.drop_column('difficulty')
        batch_op.drop_column('category_id')
        batch_op.drop_column('start_lng')
        batch_op.drop_column('start_lat')
        batch_op.drop_column('city')
        batch_op.drop_column('completion_message')
        batch_op.drop_column('story_goal')
