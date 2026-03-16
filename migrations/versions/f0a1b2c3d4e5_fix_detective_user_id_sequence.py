"""fix detective_user id sequence (PostgreSQL)

Revision ID: f0a1b2c3d4e5
Revises: e9f1a2b3c4d5
Create Date: 2026-03-14

Ensures detective.detective_user.id has a default so INSERTs get an id.
"""
from alembic import op


revision = 'f0a1b2c3d4e5'
down_revision = 'e9f1a2b3c4d5'
branch_labels = None
depends_on = None


def upgrade():
    # PostgreSQL: create sequence in detective schema and set as default for id
    op.execute("""
        CREATE SEQUENCE IF NOT EXISTS detective.detective_user_id_seq;
        ALTER TABLE detective.detective_user
        ALTER COLUMN id SET DEFAULT nextval('detective.detective_user_id_seq');
    """)
    # Sync sequence to current max id so next insert gets max+1
    op.execute("""
        SELECT setval('detective.detective_user_id_seq',
                     COALESCE((SELECT MAX(id) FROM detective.detective_user), 1));
    """)


def downgrade():
    op.execute("""
        ALTER TABLE detective.detective_user ALTER COLUMN id DROP DEFAULT;
        DROP SEQUENCE IF EXISTS detective.detective_user_id_seq;
    """)
