import sqlite3
from decorators import sqlite_cursor
from data_channel import DataChannel
from db_interactions.utils import map_row, map_rows


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
def change_task_title(cursor: sqlite3.Cursor, task_id: int, title: str):
    cursor.execute("UPDATE tasks SET title = ? WHERE id = ? returning *", (title, task_id))
    cols =[col[0] for col in cursor.description]
    return map_row(cols, cursor.fetchone())
