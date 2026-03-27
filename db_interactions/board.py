import sqlite3
from decorators import sqlite_cursor
from db_interactions.utils import map_row, map_rows


@sqlite_cursor
def get_users_boards(cursor: sqlite3.Cursor, user_id: int):
    cursor.execute("""SELECT * FROM board
        join board_members on board.id = board_members.board_id
        where board_members.user_id = ?""", (user_id,))
    res = cursor.fetchall()
    assert type(res) == list
    col_names = [desc[0] for desc in cursor.description]
    return  map_rows(col_names=col_names, rows=res)


@sqlite_cursor
def get_board(cursor: sqlite3.Cursor, board_id: int):
    cursor.execute("SELECT * FROM board where id = ?", (board_id,))
    res = cursor.fetchone()
    assert type(res) == tuple
    col_names = [desc[0] for desc in cursor.description]
    return  map_row(col_names=col_names, row=res)


@sqlite_cursor
def create_board(cursor: sqlite3.Cursor, title: str):
    cursor.execute("INSERT INTO board (title) VALUES (?) returning id", (title,))
    cols =[col[0] for col in cursor.description]
    return map_row(cols, cursor.fetchone())
