import sqlite3
from decorators import sqlite_cursor
from db_interactions.utils import map_row, map_rows


@sqlite_cursor
def create_user(cursor: sqlite3.Cursor, name: str, hashed_password: str):
    try:    
        cursor.execute(
            "INSERT INTO user (name, hashed_password) VALUES (?, ?) RETURNING id",
            (name, hashed_password)
        )
        
        row = cursor.fetchone()
        created = row is not None
    except Exception as e:
        print(f'Error creating user: {e}')
        created = False
        row = None
    finally:
        print(f'{cursor.rowcount = }')
    return map_row(['id'], row) if row else None, created


@sqlite_cursor
def get_user(cursor: sqlite3.Cursor, id: int):
    cursor.execute("select * from user where id = ?", (id))
    cols =[col[0] for col in cursor.description]
    return map_row(cols, cursor.fetchone())




@sqlite_cursor
def get_user_by_name(cursor: sqlite3.Cursor, name: str):
    cursor.execute("select * from user where name = ?", (name,))
    cols =[col[0] for col in cursor.description]
    userRow = cursor.fetchone()
    return map_row(cols, userRow) if userRow else None