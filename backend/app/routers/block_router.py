from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.schemas.block_schema import (
    BlockCreate,
    BlockResponse
)
from app.services.block_service import (
    block_user,
    unblock_user,
    get_blocked_users
)

# IMPORTANT:
# Use the SAME import that profile_router/auth protected routes use
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/safety",
    tags=["Safety"]
)


@router.post(
    "/block",
    response_model=BlockResponse
)
def create_block(
    request: BlockCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # Prevent self-blocking
    if current_user.id == request.blocked_user_id:
        raise HTTPException(
            status_code=400,
            detail="You cannot block yourself"
        )

    # Verify user exists
    user = (
        db.query(User)
        .filter(User.id == request.blocked_user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return block_user(
        db,
        current_user.id,
        request.blocked_user_id
    )


@router.get(
    "/blocked-users",
    response_model=list[BlockResponse]
)
def blocked_users(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_blocked_users(
        db,
        current_user.id
    )


@router.delete("/block/{blocked_user_id}")
def remove_block(
    blocked_user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    success = unblock_user(
        db,
        current_user.id,
        blocked_user_id
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Block record not found"
        )

    return {
        "message": "User unblocked"
    }