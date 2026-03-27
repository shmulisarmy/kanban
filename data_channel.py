



from typing import ClassVar
from typing import Callable, TypeAlias
from dataclasses import dataclass, field

from fastapi import WebSocket






#for ai autocomplete
ExampleEventType = {
    "type": "create",
    "data": dict,
    "id": int,
}


#Todo: add timestamps

RowId: TypeAlias = int
@dataclass
class DataChannel:
    key: str
    get_data: Callable[[], dict]
    rows: dict[RowId, dict] = None
    connected_clients: list[WebSocket] = field(default_factory=list)
    all_channels: ClassVar[dict[str, 'DataChannel']] = {}

    def __post_init__(self):
        print(f'calling post init')
        
        assert self.rows is None
        self.rows: dict[RowId, dict] = self.get_data()
        print(f'{self.rows = }')
        DataChannel.all_channels[self.key] = self


    @staticmethod
    def get_or_create_channel(key: str, get_data: Callable[[], dict]) -> 'DataChannel':
        if not DataChannel.all_channels.get(key):
            DataChannel.all_channels[key] = DataChannel(key, get_data)
        return DataChannel.all_channels[key]


    async def create_row(self, data: dict):
        assert "id" not in self.rows, "id is a reserved key"
        self.rows[data["id"]] = data
        await self.broadcast({"type": "create", "data": data, "id": data["id"]})



    async def broadcast(self, data: dict):
        for client in self.connected_clients:
            await client.send_json(data)
    async def update_row(self, id: int, row: dict):
        assert id in self.rows, f"your calling update on a row that doesn't exist: {id}"
        self.rows[id] = row
        await  self.broadcast({"type": "update", "id": id, "data": row})

    async def delete_row(self, id: int):
        print(f"deleting row: {self.rows = }")
        assert id in self.rows, f"your calling delete on a row that doesn't exist: {id}"
        del self.rows[id]
        await self.broadcast({"type": "delete", "id": id})

    async def on_join(self, websocket: WebSocket):
        print(f'joining websocket: {websocket} to data channel: {self}')
        
        self.connected_clients.append(websocket)
        # await websocket.accept()
        await websocket.send_json({"type": "initial-data", "data": self.rows})
        
        