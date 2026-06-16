from fastapi import APIRouter, HTTPException
from fastapi import Depends
from datetime import datetime

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.core.dependencies import get_current_user

from app.models.user import User
from app.models.mbti_result import MBTIResult

from app.data.mbti_questions import MBTI_QUESTIONS

from app.utils.mbti import calculate_confidence, calculate_mbti, needs_tiebreaker

from app.schemas.mbti_schema import (MBTICreate,MBTIResponse,MBTITestRequest,MBTITestResponse)

from app.services.mbti_service import (create_mbti)
from app.database import db

router = APIRouter(prefix="/mbti",tags=["MBTI"])

VALID_MBTI_TYPES = {
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP"
}

@router.get("/questions")
def get_mbti_questions():

    return MBTI_QUESTIONS

@router.post(
    "/test",
    response_model=MBTITestResponse
)
def take_mbti_test(
    data: MBTITestRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    
    if len(data.answers) != 20:
        raise HTTPException(
            status_code=400,
            detail="All 20 questions must be answered"
        )

    result = calculate_mbti(data.answers)

    mbti_type = result["mbti_type"]

    scores = result["scores"]

    confidence = calculate_confidence(scores)

    tiebreakers = needs_tiebreaker(scores)

    existing_result = (
        db.query(MBTIResult)
        .filter(
            MBTIResult.user_id
            == current_user.id
        )
        .first()
    )

    if existing_result:

        existing_result.mbti_type = (mbti_type)

        existing_result.test_date = datetime.utcnow()

        db.commit()

    else:

        result = MBTIResult(
            user_id=current_user.id,
            mbti_type=mbti_type
        )

        db.add(result)
        db.commit()

    return {
        "mbti_type": mbti_type,
            "scores": scores,
        "confidence": confidence,
        "tiebreakers_needed": tiebreakers
    }

@router.post(
    "/",
    response_model=MBTIResponse
)
def save_mbti(data: MBTICreate,db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):

    mbti_type = data.mbti_type.upper()

    if mbti_type not in VALID_MBTI_TYPES:
        raise HTTPException(status_code=400,detail="Invalid MBTI type")

    existing_result = (
        db.query(MBTIResult)
        .filter(MBTIResult.user_id == current_user.id).first())

    if existing_result:

        existing_result.mbti_type = mbti_type

        db.commit()
        db.refresh(existing_result)

        return existing_result

    return create_mbti(db,current_user.id,mbti_type)

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