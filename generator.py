

from typing import Callable

from route_maker import make_ts_url
from route_maker import make_url
API_URL = "http://localhost:8001"
ts_type_map = {
    int: "number",
    str: "string",
    bool: "boolean",
    dict: "object",
    list: "array",
    tuple: "array",
    None: "void",
}




def func_to_ts_code(func: Callable, params: dict, file_line: str):
    if "return" in params:
        return_type = ts_type_map.get(params["return"], "any")
        del params["return"]
    else:
        return_type = "undefined"
    if "request" in params:
        del params["request"]
    print(f'{func.__name__ = }{params = }')
    
    args_str = "(" + ", ".join([f"{arg}: {ts_type_map.get(arg_type, 'any')}" for arg, arg_type in params.items()]) + ")"
    print(f'{args_str = }')
    
    return f"""
export async function {func.__name__}{args_str} : Promise<{return_type}> {{ 
    // LINK {file_line}
    const res = await fetch({make_ts_url(func, params)}, {{ 
        method: "GET",
        headers: {{
            "Content-Type": "application/json",
        }},
        credentials: "include",
    }})
    return res.json()
}}
"""



