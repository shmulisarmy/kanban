import settings
def make_url(func: Callable, params: dict) -> str:
    if "return" in params:
        del params["return"]
    if "request" in params:
        del params["request"]
    params_str = "".join([f"/{{{arg}}}" for arg, arg_type in params.items()])
    url = f"/{func.__name__}{params_str}"
    return url





def make_ts_url(func: Callable, params: dict) -> str:
    if "return" in params:
        del params["return"]
    if "request" in params:
        del params["request"]
    params_str = "".join([f"/${{{arg}}}" for arg, arg_type in params.items()])
    url = f"`{settings.API_URL}/{func.__name__}{params_str}`"
    return url
