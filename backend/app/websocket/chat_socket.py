from fastapi import WebSocket

active_connections = {}


class ConnectionManager:

    async def connect(
        self,
        user_id: int,
        websocket: WebSocket
    ):
        await websocket.accept()

        active_connections[user_id] = websocket

    def disconnect(
        self,
        user_id: int
    ):
        active_connections.pop(
            user_id,
            None
        )

    async def send_personal_message(
        self,
        receiver_id: int,
        message
    ):
        websocket = active_connections.get(
            receiver_id
        )

        if websocket:
            await websocket.send_json(
                message
            )


manager = ConnectionManager()