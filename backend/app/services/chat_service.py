from sqlalchemy.orm import Session

from app.models.message import Message


def save_message(
    db: Session,
    sender_id: int,
    receiver_id: int,
    content: str
):
    message = Message(
        sender_id=sender_id,
        receiver_id=receiver_id,
        content=content
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message


def get_chat_history(
    db: Session,
    user1: int,
    user2: int
):
    return (
        db.query(Message)
        .filter(
            (
                (Message.sender_id == user1)
                &
                (Message.receiver_id == user2)
            )
            |
            (
                (Message.sender_id == user2)
                &
                (Message.receiver_id == user1)
            )
        )
        .order_by(Message.created_at.asc())
        .all()
    )