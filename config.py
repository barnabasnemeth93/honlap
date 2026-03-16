import os
from dotenv import load_dotenv
from urllib.parse import urlparse

load_dotenv()

def ensure_sslmode(db_url: str) -> str:
    if not db_url:
        return db_url
    # Ha már van query string, és benne sslmode, hagyjuk
    if "sslmode=" in db_url:
        return db_url
    # Ha nincs query, fűzzük hozzá
    sep = "&" if "?" in db_url else "?"
    return f"{db_url}{sep}sslmode=require"

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-me")
    RAW_DB = os.getenv("DATABASE_URL", "")
    SQLALCHEMY_DATABASE_URI = ensure_sslmode(RAW_DB)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
