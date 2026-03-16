"""add clue xp_reward coins_reward

Revision ID: d8e5a3f1b2c9
Revises: c7d4f2e1a9b6
Create Date: 2026-03-14

"""
from alembic import op
import sqlalchemy as sa


revision = 'd8e5a3f1b2c9'
down_revision = 'c7d4f2e1a9b6'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('detective_clue', schema=None) as batch_op:
        batch_op.add_column(sa.Column('xp_reward', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('coins_reward', sa.Integer(), nullable=True))


def downgrade():
    with op.batch_alter_table('detective_clue', schema=None) as batch_op:
        batch_op.drop_column('coins_reward')
        batch_op.drop_column('xp_reward')
