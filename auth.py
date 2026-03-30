import base64
import hashlib
import json
from cryptography.fernet import Fernet


class JsonCipher:
    def __init__(self, key: str):
        fernet_key = base64.urlsafe_b64encode(hashlib.sha256(key.encode()).digest())
        self.fernet = Fernet(fernet_key)

    def encrypt(self, data: dict) -> str:
        raw = json.dumps(data).encode()
        return self.fernet.encrypt(raw).decode()

    def decrypt(self, token: str) -> dict:
        raw = self.fernet.decrypt(token.encode())
        return json.loads(raw)






