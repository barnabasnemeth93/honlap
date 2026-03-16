"""add xp coins rank (gamification)

Revision ID: c7d4f2e1a9b6
Revises: b2c8e9a1d4f3
Create Date: 2026-03-14

"""
from alembic import op
import sqlalchemy as sa


revision = 'c7d4f2e1a9b6'
down_revision = 'b2c8e9a1d4f3'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('detective_user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('xp', sa.Integer(), nullable=False, server_default=sa.text('0')))
        batch_op.add_column(sa.Column('coins', sa.Integer(), nullable=False, server_default=sa.text('0')))
        batch_op.add_column(sa.Column('rank', sa.String(length=50), nullable=False, server_default='Rookie Detective'))


def downgrade():
    with op.batch_alter_table('detective_user', schema=None) as batch_op:
        batch_op.drop_column('rank')
        batch_op.drop_column('coins')
        batch_op.drop_column('xp')
