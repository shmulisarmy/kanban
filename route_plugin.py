from typing import Callable

from fastapi import FastAPI
from route_maker import make_url
from generator import func_to_ts_code

ts_generated_file: str | None = None
app: FastAPI | None = None


has_initialized = False


def init(ts_file: str, fastapi_app: FastAPI):
    global ts_generated_file, app, has_initialized
    ts_generated_file = ts_file
    app = fastapi_app
    with open(ts_generated_file, "w") as f:
        f.write("import { API_BASE_URL } from './settings';\n\n")
    has_initialized = True




def route(func: Callable):
    assert has_initialized, "init must be called before using @route"
    assert app is not None, "app must be set before using @route"
    assert ts_generated_file is not None, "ts_generated_file must be set before using @route"
    file, line = func.__code__.co_filename, func.__code__.co_firstlineno
    file_line = f"{file}:{line}"
    params = dict(func.__annotations__)
    with open(ts_generated_file, "a") as f:
        f.write(func_to_ts_code(func, params, file_line))
    app.get(make_url(func, params))(func)

