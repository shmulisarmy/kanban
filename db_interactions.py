import sqlite3
from decorators import sqlite_cursor
from data_channel import DataChannel


@sqlite_cursor
def create_list(cursor: sqlite3.Cursor, title: str, board_id: int):
    cursor.execute("INSERT INTO list (title, board_id) VALUES (?, ?) returning id", (title, board_id))
    cols =[col[0] for col in cursor.description]
    return map_row(cols, cursor.fetchone())


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




@sqlite_cursor
def change_task_list(cursor: sqlite3.Cursor, task_id: int, list_id: int):
    cursor.execute("UPDATE tasks SET list_id = ? WHERE id = ? returning *", (list_id, task_id))
    cols =[col[0] for col in cursor.description]
    return map_row(cols, cursor.fetchone())


@sqlite_cursor
def create_task(cursor: sqlite3.Cursor, title: str, list_id: int) -> dict:
    res = cursor.execute("INSERT INTO tasks (title, list_id) VALUES (?, ?) returning *", (title, list_id))
    channel =  DataChannel.get_or_create_channel(f"list/{list_id}", lambda: get_list_tasks(list_id))
    cols =[col[0] for col in cursor.description]
    return map_row(cols, cursor.fetchone())


@sqlite_cursor
def delete_task(cursor: sqlite3.Cursor, task_id: int) -> int:
    q = "DELETE FROM tasks where id = ? returning *"
    print(f"{q=}")
    a = (task_id,)
    print(f"{a=}")
    cursor.execute(q, a)
    res = cursor.fetchone()
    return res



@sqlite_cursor
def get_list_tasks(cursor: sqlite3.Cursor, list_id: int):
    cursor.execute("SELECT * FROM tasks where list_id = ?", (list_id,))
    res = cursor.fetchall()
    assert type(res) == list
    col_names = [desc[0] for desc in cursor.description]
    return  map_rows(col_names=col_names, rows=res)


@sqlite_cursor
def get_users_tasks(cursor: sqlite3.Cursor, user_id: int):
    cursor.execute("SELECT * FROM tasks join user on user.id = tasks.user_id where user.id = ?", (user_id,))
    res = cursor.fetchall()
    assert type(res) == list
    col_names = [desc[0] for desc in cursor.description]
    return  map_rows(col_names=col_names, rows=res)


@sqlite_cursor
def get_board_lists(cursor: sqlite3.Cursor, board_id: int):
    cursor.execute("SELECT * FROM list where board_id = ?", (board_id,))
    res = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    return  map_rows(col_names=col_names, rows=res)



def map_row(col_names: list[str], row: tuple, dont_log: bool = False) -> dict:
    res = {}
    for i in range(len(col_names)):
        res[col_names[i]] = row[i]
    if not dont_log:
        print(f"{res=}")
    return res
def map_rows(col_names, rows: list[tuple]) -> dict[int, dict]:
    res = {}
    id_index = col_names.index("id")
    for row in rows:
        res[row[id_index]] = map_row(col_names=col_names, row=row, dont_log=True)
    print(f"{res=}")
    return res





@sqlite_cursor
def change_list_title(cursor: sqlite3.Cursor, list_id: int, title: str):
    cursor.execute("UPDATE list SET title = ? WHERE id = ?", (title, list_id))
    return cursor.rowcount

@sqlite_cursor
def remove_list(cursor: sqlite3.Cursor, list_id: int):
    cursor.execute("DELETE FROM list WHERE id = ?", (list_id,))
    return cursor.rowcount

@sqlite_cursor
def change_task_title(cursor: sqlite3.Cursor, task_id: int, title: str):
    cursor.execute("UPDATE tasks SET title = ? WHERE id = ? returning *", (title, task_id))
    cols =[col[0] for col in cursor.description]
    return map_row(cols, cursor.fetchone())

# def _yolo():
#     print("yolo")

# k = 1
# v = 1

# for k, v in globals().items():
#     # if i.startswith("_") and not i.startswith("__"):
#     print(f"{k=}")