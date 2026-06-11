from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.core.dependencies import get_current_user

from app.models.user import User
from app.models.interest import Interest
from app.models.user_interest import UserInterest

from app.schemas.interest_schema import (
    InterestCreate,
    InterestResponse
)

from app.services.interest_service import (
    create_interest,
    get_all_interests,
    add_interest_to_user
)

router = APIRouter(
    prefix="/interests",
    tags=["Interests"]
)

@router.post(
    "/",
    response_model=InterestResponse
)
def create_new_interest(
    data: InterestCreate,
    db: Session = Depends(get_db)
):

    return create_interest(
        db,
        data.interest_name
    )

@router.get(
    "/",
    response_model=list[InterestResponse]
)
def list_interests(
    db: Session = Depends(get_db)
):

    return get_all_interests(db)

@router.post("/{interest_id}")
def add_my_interest(
    interest_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    add_interest_to_user(
        db,
        current_user.id,
        interest_id
    )

    return {
        "message": "Interest added"
    }

@router.get("/me")
def get_my_interests(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    interests = (
        db.query(Interest)
        .join(
            UserInterest,
            Interest.id == UserInterest.interest_id
        )
        .filter(
            UserInterest.user_id == current_user.id
        )
        .all()
    )

    return interests

@router.delete("/{interest_id}")
def delete_interest(
    interest_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    relation = (
        db.query(UserInterest)
        .filter(
            UserInterest.user_id == current_user.id,
            UserInterest.interest_id == interest_id
        )
        .first()
    )

    if not relation:
        raise HTTPException(
            status_code=404,
            detail="Interest not found"
        )

    db.delete(relation)
    db.commit()

    return {
        "message": "Interest removed"
    }