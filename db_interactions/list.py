from typing import TypedDict
import sqlite3
from decorators import sqlite_cursor
from db_interactions.utils import map_row, map_rows


@sqlite_cursor
def create_list(cursor: sqlite3.Cursor, title: str, board_id: int):
    print(f"{create_list.__name__} {locals()}")
    cursor.execute("INSERT INTO list (title, board_id) VALUES (?, ?) returning *", (title, board_id))
    cols =[col[0] for col in cursor.description]
    return map_row(cols, cursor.fetchone())


@sqlite_cursor
def get_board_lists(cursor: sqlite3.Cursor, board_id: int):
    cursor.execute("SELECT * FROM list where board_id = ?", (board_id,))
    res = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    return  map_rows(col_names=col_names, rows=res)


@sqlite_cursor
def change_list_title(cursor: sqlite3.Cursor, list_id: int, title: str):
    cursor.execute("UPDATE list SET title = ? WHERE id = ?", (title, list_id))
    return cursor.rowcount

@sqlite_cursor
def remove_list(cursor: sqlite3.Cursor, list_id: int):
    cursor.execute("DELETE FROM list WHERE id = ?", (list_id,))
    return cursor.rowcount


ListType = TypedDict("ListType", {"id": int, "title": str, "board_id": int})


@sqlite_cursor
def get_all_lists(cursor: sqlite3.Cursor) -> list[ListType]:
    cursor.execute("SELECT * FROM list")
    res = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    return  map_rows(col_names=col_names, rows=res)
