"""add campaign xp_reward coins_reward

Revision ID: a5c6d7e8f9a0
Revises: e9f1a2b3c4d5
Create Date: 2026-03-14

"""
from alembic import op
import sqlalchemy as sa


revision = 'a5c6d7e8f9a0'
down_revision = 'e9f1a2b3c4d5'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('detective_campaign', schema='detective') as batch_op:
        batch_op.add_column(sa.Column('xp_reward', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('coins_reward', sa.Integer(), nullable=True))


def downgrade():
    with op.batch_alter_table('detective_campaign', schema='detective') as batch_op:
        batch_op.drop_column('coins_reward')
        batch_op.drop_column('xp_reward')
