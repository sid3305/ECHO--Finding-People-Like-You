from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import WebSocket
from fastapi import WebSocketDisconnect

from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.dependencies import get_current_user

from app.models.user import User
from app.models.match import Match

from app.schemas.message_schema import (
    MessageCreate,
    MessageResponse
)

from app.services.chat_service import (
    get_chat_history,
    save_message
)

from app.websocket.chat_socket import manager

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

@router.post(
    "/send",
    response_model=MessageResponse
)
def send_message(
    message_data: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    match = (
        db.query(Match)
        .filter(
            (
                (Match.requester_id == current_user.id)
                &
                (Match.receiver_id == message_data.receiver_id)
            )
            |
            (
                (Match.requester_id == message_data.receiver_id)
                &
                (Match.receiver_id == current_user.id)
            )
        )
        .filter(
            Match.status == "accepted"
        )
        .first()
    )

    if not match:
        raise HTTPException(
            status_code=403,
            detail="Chat unavailable"
        )

    if not message_data.content.strip():
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty"
        )

    return save_message(
        db,
        current_user.id,
        message_data.receiver_id,
        message_data.content.strip()
    )

@router.get(
    "/history/{user_id}",
    response_model=list[MessageResponse]
)
def get_history(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    match = (
        db.query(Match)
        .filter(
            (
                (Match.requester_id == current_user.id)
                &
                (Match.receiver_id == user_id)
            )
            |
            (
                (Match.requester_id == user_id)
                &
                (Match.receiver_id == current_user.id)
            )
        )
        .filter(
            Match.status == "accepted"
        )
        .first()
    )

    if not match:
        raise HTTPException(
            status_code=403,
            detail="Chat unavailable"
        )

    return get_chat_history(
        db,
        current_user.id,
        user_id
    )


@router.get("/conversations")
def get_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    matches = (
        db.query(Match)
        .filter(
            (
                (Match.requester_id == current_user.id)
                |
                (Match.receiver_id == current_user.id)
            )
        )
        .filter(
            Match.status == "accepted"
        )
        .all()
    )

    conversations = []

    for match in matches:

        other_user_id = (
            match.receiver_id
            if match.requester_id == current_user.id
            else match.requester_id
        )

        conversations.append(
            {
                "match_id": match.id,
                "user_id": other_user_id
            }
        )

    return conversations


@router.websocket("/ws/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    user_id: int
):
    await manager.connect(
        user_id,
        websocket
    )

    try:

        while True:

            data = await websocket.receive_json()

            sender_id = data["sender_id"]
            receiver_id = data["receiver_id"]
            content = data["content"]

            await manager.send_personal_message(
                receiver_id,
                {
                    "sender_id": sender_id,
                    "content": content
                }
            )

    except WebSocketDisconnect:

        manager.disconnect(
            user_id
        )