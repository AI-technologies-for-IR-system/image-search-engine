import os

config_db = {
    'host': os.getenv("DB_HOST") or "localhost",
    'port': os.getenv("DB_PORT") or "5432",
    'database': os.getenv("DB_DBNAME") or "rnb",
    'user': os.getenv("DB_USER") or "postgres",
    'password': os.getenv("DB_PASS") or ""
}

config_jwt = {
    'JWT_SECRET_KEY': os.getenv("JWT_SECRET") or "3436",
    'JWT_REFRESH_COOKIE_PATH': '/api/refresh',
    'JWT_TOKEN_LOCATION': ['headers']
}

other_configs = {
    "pwd_salt": os.getenv("PWD_SALT") or "345"
}
