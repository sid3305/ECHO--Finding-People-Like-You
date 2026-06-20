from fastapi import APIRouter
from fastapi import Depends
from fastapi import Query

from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.session import get_db

from app.models.user import User

from app.ai.database_recommendation_engine import get_recommendations


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
    ),
    db: Session = Depends(
        get_db
    )
):

    return get_recommendations(
        db=db,
        current_user_id=current_user.id,
        limit=top_n
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
    ),
    db: Session = Depends(
        get_db
    )
):

    return get_recommendations(
        db=db,
        current_user_id=user_id,
        limit=top_n,
        gender=gender,
        min_age=min_age,
        max_age=max_age,
        respect_preference=respect_preference
    )