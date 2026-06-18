from sqlalchemy.orm import Session

from app.models.block import Block


def block_user(
    db: Session,
    blocker_id: int,
    blocked_id: int
):
    existing = (
        db.query(Block)
        .filter(
            Block.blocker_id == blocker_id,
            Block.blocked_id == blocked_id
        )
        .first()
    )

    if existing:
        return existing

    block = Block(
        blocker_id=blocker_id,
        blocked_id=blocked_id
    )

    db.add(block)
    db.commit()
    db.refresh(block)

    return block


def get_blocked_users(
    db: Session,
    user_id: int
):
    return (
        db.query(Block)
        .filter(Block.blocker_id == user_id)
        .all()
    )


def unblock_user(
    db: Session,
    blocker_id: int,
    blocked_id: int
):
    block = (
        db.query(Block)
        .filter(
            Block.blocker_id == blocker_id,
            Block.blocked_id == blocked_id
        )
        .first()
    )

    if not block:
        return False

    db.delete(block)
    db.commit()

    return True