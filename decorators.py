from functools import wraps
import sqlite3
import threading

import settings

_lock = threading.Lock()

    

def sqlite_cursor(func):
    """Decorator to provide a cursor to a function with automatic commit/rollback."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        conn = sqlite3.connect(settings.db_path)
        with _lock:
            cursor = conn.cursor()
            try:
                result = func(cursor, *args, **kwargs)
                conn.commit()
                return result
            except Exception as e:
                conn.rollback()
                raise e
            finally:
                cursor.close()
    return wrapper