import sqlite3
from decorators import sqlite_cursor
from db_interactions.utils import map_row, map_rows


@sqlite_cursor
def create_user(cursor: sqlite3.Cursor, name: str, password: str):
    print(f"{create_list.__name__} {locals()}")
    cursor.execute("INSERT INTO user (name, password) VALUES (?, ?) returning id", (name, password))
    cols =[col[0] for col in cursor.description]
    return map_row(cols, cursor.fetchone())


@sqlite_cursor
def get_user(cursor: sqlite3.Cursor, id: int):
    cursor.query("select * from user where id = ?", (id))
    cols =[col[0] for col in cursor.description]
    return map_row(cols, cursor.fetchone())


