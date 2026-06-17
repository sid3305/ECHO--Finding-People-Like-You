from fastapi import APIRouter
from fastapi import Depends

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
    current_user: User = Depends(
        get_current_user
    )
):

    return get_user_recommendations(
        current_user.id
    )


@router.get("/{user_id}")
def get_recommendations_for_user(
    user_id: int
):

    return get_user_recommendations(
        user_id
    )