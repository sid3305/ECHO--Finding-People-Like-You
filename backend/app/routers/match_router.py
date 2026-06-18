from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.core.dependencies import (
    get_current_user
)

from app.models.user import User
from app.models.match import Match
from app.models.block import Block

from app.schemas.match_schema import (
    MatchRequest,
    MatchResponse
)

from app.services.match_service import (
    create_match_request,
    accept_match,
    reject_match,
    get_user_matches
)

router = APIRouter(
    prefix="/matches",
    tags=["Matches"]
)

@router.post(
    "/request",
    response_model=MatchResponse
)
def send_match_request(
    request: MatchRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Cannot match yourself
    if current_user.id == request.receiver_id:
        raise HTTPException(
            status_code=400,
            detail="Cannot match yourself"
        )

    # Receiver must exist
    receiver = (
        db.query(User)
        .filter(
            User.id == request.receiver_id
        )
        .first()
    )

    if receiver is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Suspended users cannot receive matches
    if receiver.is_suspended:
        raise HTTPException(
            status_code=403,
            detail="User unavailable"
        )

    # Block check (both directions)
    blocked = (
        db.query(Block)
        .filter(
            (
                (Block.blocker_id == current_user.id)
                &
                (Block.blocked_id == request.receiver_id)
            )
            |
            (
                (Block.blocker_id == request.receiver_id)
                &
                (Block.blocked_id == current_user.id)
            )
        )
        .first()
    )

    if blocked:
        raise HTTPException(
            status_code=403,
            detail="Match request not allowed"
        )

    # Duplicate request check
    existing_match = (
        db.query(Match)
        .filter(
            Match.requester_id == current_user.id,
            Match.receiver_id == request.receiver_id
        )
        .first()
    )

    if existing_match:
        raise HTTPException(
            status_code=400,
            detail="Match request already exists"
        )

    return create_match_request(
        db,
        current_user.id,
        request.receiver_id
    )

@router.post(
    "/accept/{match_id}",
    response_model=MatchResponse
)
def accept_match_request(
    match_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    match = (
        db.query(Match)
        .filter(
            Match.id == match_id
        )
        .first()
    )

    if not match:
        raise HTTPException(
            status_code=404,
            detail="Match not found"
        )

    if match.receiver_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    return accept_match(
        db,
        match
    )

@router.post(
    "/reject/{match_id}",
    response_model=MatchResponse
)
def reject_match_request(
    match_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    match = (
        db.query(Match)
        .filter(
            Match.id == match_id
        )
        .first()
    )

    if not match:
        raise HTTPException(
            status_code=404,
            detail="Match not found"
        )

    if match.receiver_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    return reject_match(
        db,
        match
    )

@router.get(
    "/",
    response_model=list[MatchResponse]
)
def get_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_user_matches(
        db,
        current_user.id
    )