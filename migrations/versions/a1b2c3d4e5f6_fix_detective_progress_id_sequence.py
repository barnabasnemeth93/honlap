"""fix detective_progress id sequence (PostgreSQL)

Revision ID: a1b2c3d4e5f6
Revises: f0a1b2c3d4e5
Create Date: 2026-03-14

Ensures detective.detective_progress.id has a default so INSERTs get an id.
"""
from alembic import op


revision = 'a1b2c3d4e5f6'
down_revision = 'f0a1b2c3d4e5'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
        CREATE SEQUENCE IF NOT EXISTS detective.detective_progress_id_seq;
        ALTER TABLE detective.detective_progress
        ALTER COLUMN id SET DEFAULT nextval('detective.detective_progress_id_seq');
    """)
    op.execute("""
        SELECT setval('detective.detective_progress_id_seq',
                     COALESCE((SELECT MAX(id) FROM detective.detective_progress), 1));
    """)


def downgrade():
    op.execute("""
        ALTER TABLE detective.detective_progress ALTER COLUMN id DROP DEFAULT;
        DROP SEQUENCE IF EXISTS detective.detective_progress_id_seq;
    """)
