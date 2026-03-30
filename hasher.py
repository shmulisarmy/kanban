import hashlib


def hash(password: str) -> str:
    """Hash a password using SHA-512."""
    hash_object = hashlib.sha512()
    
    hash_object.update(password.encode('utf-8'))
    
    hex_dig = hash_object.hexdigest()
    
    return hex_dig
