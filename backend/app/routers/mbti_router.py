from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.core.dependencies import get_current_user

from app.models.user import User
from app.models.mbti_result import MBTIResult

from app.schemas.mbti_schema import (
    MBTICreate,
    MBTIResponse
)

from app.services.mbti_service import (
    create_mbti
)

router = APIRouter(
    prefix="/mbti",
    tags=["MBTI"]
)

@router.post(
    "/",
    response_model=MBTIResponse
)
def save_mbti(
    data: MBTICreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    return create_mbti(
        db,
        current_user.id,
        data.mbti_type
    )

@router.get(
    "/",
    response_model=MBTIResponse
)
def get_mbti(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    return (
        db.query(MBTIResult)
        .filter(
            MBTIResult.user_id == current_user.id
        )
        .first()
    )