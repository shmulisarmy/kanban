import os

db_path = "database.db"
port = int(os.environ.get("PORT", 8080))
API_URL = f"http://localhost:{port}"