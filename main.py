from typing import TypedDict
from auth import JsonCipher
from fastapi.responses import JSONResponse
import route_plugin
from route_plugin import route, init
import settings
from fastapi import FastAPI, WebSocket, Request, Response
from fastapi.responses import HTMLResponse
from fastapi.websockets import WebSocketDisconnect, WebSocket

from fastapi.middleware.cors import CORSMiddleware
import sqlite3

import data_channel
import db_interactions

db_path = "database.db"



def get_db_cursor():
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    return cursor


app = FastAPI()
route_plugin.init("my-vue-app/src/generated.ts", app)



app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://localhost:5001",
        "ws://localhost:5173",
        "ws://localhost:5174",
        "ws://127.0.0.1:5173",
        "ws://localhost:5001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



j = JsonCipher("djaislkdjgkldsajgkldsjakljdsklgjsdklajgklsddasggggggggggggggggdasdgsagdsagdsiaougdoisaugoidusagiodusgiousaioa")

###
from hasher import hash

@route
async def me(request: Request):
    authCookies = request.cookies.get("auth")
    if not authCookies:
        return {"message": "Hello World", "auth": None}
    return {"message": "Hello World", "auth": j.decrypt(authCookies)}



@route
async def sign_up(request: Request, name: str, password: str):
    user_id, created = db_interactions.user.create_user(name, hash(password))
    if not created:
        return {"message": "User name already exists"}
    response = JSONResponse({"message": "User created"})
    response.set_cookie(key="auth", value=j.encrypt({"user_id": user_id}), max_age=60*60*24*365)
    return response

@route
async def sign_in(request: Request, name: str, password: str):
    u: TypedDict['User', {'id': int, 'name': str, 'hashed_password': str}] | None = db_interactions.user.get_user_by_name(name)
    if not u:
        return {"message": "wrong username or password"}
    if u['hashed_password'] == hash(password):
        response = JSONResponse({"message": "User logged in"})
        response.set_cookie(key="auth", value=j.encrypt({"user_id": u['id']}), max_age=60*60*24*365)
        return response
    return {"message": "password is incorrect"}




@route
async def sign_out(request: Request):
    response = JSONResponse({"message": "User logged out"})
    response.set_cookie(key="auth", value="", max_age=0)
    return response
###


@app.get("/")
async def root(request: Request):
    authCookies = request.cookies.get("auth")
    return {"message": "Hello World"}


@route
async def change_task_list(task_id: int, old_list_id: int, new_list_id: int):
    if old_list_id == new_list_id:
        return {"message": "Task list unchanged"}
    db_interactions.change_task_list(task_id, new_list_id)
    old_channel = data_channel.DataChannel.get_or_create_channel(f"list/{old_list_id}", lambda: db_interactions.get_list_tasks(old_list_id))
    new_channel = data_channel.DataChannel.get_or_create_channel(f"list/{new_list_id}", lambda: db_interactions.get_list_tasks(new_list_id))
    await new_channel.create_row(old_channel.rows[task_id])
    await old_channel.delete_row(task_id)
    return {"message": "Task list changed"}





@route
async def remove_list(board_id: int, list_id: int):
    db_interactions.remove_list(list_id)
    channel = data_channel.DataChannel.get_or_create_channel(f"board/{board_id}", lambda: db_interactions.get_board_lists(board_id))
    await channel.delete_row(list_id)
    return {"message": "List removed"}

@route
async def change_list_title(list_id: int, title: str):
    new_list = db_interactions.change_list_title(list_id, title)
    print(f'{new_list = }')
    
    channel = data_channel.DataChannel.get_or_create_channel(f"board/{new_list['board_id']}", lambda: db_interactions.get_board_lists(new_list['board_id']))
    await channel.update_row(list_id, new_list)
    return {"message": "List title changed"}

@route
async def change_task_title(task_id: int, title: str):
    row = db_interactions.change_task_title(task_id, title)
    print(f'{row = }')
    
    channel = data_channel.DataChannel.get_or_create_channel(f"list/{row['list_id']}", lambda: db_interactions.get_list_tasks(row['list_id']))
    await channel.update_row(task_id, row)
    return {"message": "Task title changed"}
@route
async def greeting(request: Request, name: str):
    authCookies = request.cookies.get("auth")
    return {"message": f"Hello {name}"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print("some is trying to connect")
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")

@route
def add(a: int, b: int) -> int:
    return a + b

@route
def sub(a: int, b: int) -> int:
    return a - b

@app.websocket("/list/{list_id}")
async def list_channel(websocket: WebSocket, list_id: int):
    print("some is trying to connect")
    await websocket.accept()
    channel = data_channel.DataChannel.get_or_create_channel(f"list/{list_id}", lambda: db_interactions.get_list_tasks(list_id))
    await channel.on_join(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            print(f"recieved data: {data} from {websocket}")
    except WebSocketDisconnect as e:
        channel.connected_clients.remove(websocket)


    


@app.websocket("/board/{board_id}")
async def board_channel(websocket: WebSocket, board_id: int):
    print("some is trying to connect")
    await websocket.accept()
    channel = data_channel.DataChannel.get_or_create_channel(f"board/{board_id}", lambda: db_interactions.get_board_lists(board_id))
    await channel.on_join(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            print(f"recieved data: {data} from {websocket}")
    except WebSocketDisconnect as e:
        channel.connected_clients.remove(websocket)


@route
async def board(board_id: int):
    return db_interactions.get_board(board_id)



@route
async def tasks_get_tasks(user_name: str):
    return db_interactions.get_users_tasks(user_name)



@route
async def get_user_boards(user_id: int):
    return db_interactions.get_users_boards(user_id)

# @app.websocket("/list/{list_id}")
# async def list_channel(websocket: WebSocket, list_id: int):
#     print("some is trying to connect")
#     await websocket.accept()
#     channel = data_channel.DataChannel.get_or_create_channel(f"list/{list_id}", lambda: db_interactions.get_list_tasks(list_id))
#     await channel.on_join(websocket)
#     while True:
#         data = await websocket.receive_json()
#         print(f"recieved data: {data} from {websocket}")

@route
async def delete_task(list_id: int, task_id: int):
    result = db_interactions.delete_task(task_id)
    channel = data_channel.DataChannel.get_or_create_channel(f"list/{list_id}", lambda: db_interactions.get_list_tasks(list_id))
    await channel.delete_row(task_id)
    return {"message": "Task deleted", "task_id": result}


@route
async def create_board(title: str, user_id: int):
    result = db_interactions.create_board(title)
    db_interactions.add_board_member(result['id'], user_id)
    return {"message": "Board created", "board": result}
@route
async def create_list(title: str, board_id: int):    
    result = db_interactions.create_list(title, board_id)
    channel = data_channel.DataChannel.get_or_create_channel(f"board/{board_id}", lambda: db_interactions.get_board_lists(board_id))
    await channel.create_row(result)
    return {"message": "List created", "list_id": result}
@route
async def create_task(list_id: int, title: str):
    result: dict = db_interactions.create_task(title, list_id)
    channel = data_channel.DataChannel.get_or_create_channel(f"list/{list_id}", lambda: db_interactions.get_list_tasks(list_id))
    await channel.create_row(result)
    return {"message": "Task created", "task_id": result}

# print("\n\n\n\n\nRoutes:\n\n\n\n\n")
# for route in app.routes:
#     print(f"{route = }")
# print("\n\n\n\n\n\n\n\n\n")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=settings.port, reload=True)