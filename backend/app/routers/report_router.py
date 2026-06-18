from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from httpx import request
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.schemas.report_schema import (ReportCreate, ReportResponse)
from app.services.report_service import (create_report, get_reports, get_report_count)

from app.core.dependencies import get_current_user
from app.database import db
from app.models import report


router = APIRouter(
    prefix="/safety",
    tags=["Safety"]
)

@router.post(
    "/report",
    response_model=ReportResponse
)
def report_user(
    request: ReportCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.id == request.reported_user_id:
        raise HTTPException(
            status_code=400,
            detail="You cannot report yourself"
        )

    user = (
        db.query(User)
        .filter(User.id == request.reported_user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    report = create_report(db,current_user.id,request.reported_user_id,request.reason,request.description)

    report_count = get_report_count(db,request.reported_user_id)

    return {
        "id": report.id,
        "reporter_id": report.reporter_id,
        "reported_user_id": report.reported_user_id,
        "reason": report.reason,
        "description": report.description,
        "created_at": report.created_at,
        "report_count": report_count,
        "flagged_for_review": report_count >= 5
    }

@router.get(
    "/reports",
    response_model=list[ReportResponse]
)
def view_reports(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_reports(db)