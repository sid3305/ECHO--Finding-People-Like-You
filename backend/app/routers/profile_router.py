from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.dependencies import get_current_user

from app.models.user import User
from app.models.profile import Profile

from app.schemas.profile_schema import (ProfileCreate,ProfileResponse)

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)

@router.post(
    "/",
    response_model=ProfileResponse
)
def create_profile(
    profile: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    db_profile = Profile(
        user_id=current_user.id,
        age=profile.age,
        gender=profile.gender,
        friend_preference=profile.friend_preference,
        zodiac_sign=profile.zodiac_sign,
        bio=profile.bio
    )

    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)

    return db_profile

@router.get(
    "/",
    response_model=ProfileResponse
)
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    return (
        db.query(Profile)
        .filter(
            Profile.user_id == current_user.id
        )
        .first()
    )