from datetime import date

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.dependencies import get_current_user

from app.models.user import User
from app.models.profile import Profile

from app.schemas.profile_schema import (
    ProfileCreate,
    ProfileResponse
)

from app.utils.zodiac import get_zodiac_sign
from app.utils.profile_utils import calculate_age


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
    current_user: User = Depends(get_current_user)
):

    if profile.date_of_birth > date.today():
        raise HTTPException(
            status_code=400,
            detail="Invalid date of birth"
        )

    age = calculate_age(
        profile.date_of_birth
    )

    if age < 18:
        raise HTTPException(
            status_code=400,
            detail="User must be at least 18 years old"
        )

    existing_profile = (
        db.query(Profile)
        .filter(
            Profile.user_id == current_user.id
        )
        .first()
    )

    if existing_profile:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists"
        )

    zodiac_sign = get_zodiac_sign(
        profile.date_of_birth
    )

    db_profile = Profile(
        user_id=current_user.id,
        date_of_birth=profile.date_of_birth,
        gender=profile.gender,
        friend_preference=profile.friend_preference,
        zodiac_sign=zodiac_sign,
        bio=profile.bio
    )

    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)

    return {
        "id": db_profile.id,
        "user_id": db_profile.user_id,
        "date_of_birth": db_profile.date_of_birth,
        "age": calculate_age(
            db_profile.date_of_birth
        ),
        "zodiac_sign": db_profile.zodiac_sign,
        "gender": db_profile.gender,
        "friend_preference": db_profile.friend_preference,
        "bio": db_profile.bio
    }


@router.get(
    "/",
    response_model=ProfileResponse
)
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    profile = (
        db.query(Profile)
        .filter(
            Profile.user_id == current_user.id
        )
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return {
        "id": profile.id,
        "user_id": profile.user_id,
        "date_of_birth": profile.date_of_birth,
        "age": calculate_age(
            profile.date_of_birth
        ),
        "zodiac_sign": profile.zodiac_sign,
        "gender": profile.gender,
        "friend_preference": profile.friend_preference,
        "bio": profile.bio
    }