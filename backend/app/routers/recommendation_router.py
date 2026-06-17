from fastapi import APIRouter
from fastapi import Depends
from fastapi import Query

from app.core.dependencies import get_current_user

from app.models.user import User

from app.services.recommendation_service import (
    get_user_recommendations
)


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.get("/me")
def get_my_recommendations(
    top_n: int = Query(
        default=5,
        ge=1,
        le=50
    ),
    gender: str | None = Query(
        default=None
    ),
    min_age: int | None = Query(
        default=None,
        ge=13
    ),
    max_age: int | None = Query(
        default=None,
        ge=13
    ),
        respect_preference: bool = Query(
        default=False
    ),
    current_user: User = Depends(
        get_current_user
    )
):

    return get_user_recommendations(
        user_id=current_user.id,
        top_n=top_n,
        gender=gender,
        min_age=min_age,
        max_age=max_age,
        respect_preference=respect_preference
    )


@router.get("/{user_id}")
def get_recommendations_for_user(
    user_id: int,
    top_n: int = Query(
        default=5,
        ge=1,
        le=50
    ),
    gender: str | None = Query(
        default=None
    ),
    min_age: int | None = Query(
        default=None,
        ge=13
    ),
    max_age: int | None = Query(
        default=None,
        ge=13
    ),
        respect_preference: bool = Query(
        default=False
    )
):

    return get_user_recommendations(
        user_id=user_id,
        top_n=top_n,
        gender=gender,
        min_age=min_age,
        max_age=max_age,
        respect_preference=respect_preference
    )