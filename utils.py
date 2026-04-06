import os

def mustGetenv(key: str) -> str:
    value = os.getenv(key)
    if value is None:
        raise ValueError(f"Environment variable {key} is not set")
    return value
