from pydantic import BaseModel
from datetime import datetime


class ReportCreate(BaseModel):
    reported_user_id: int
    reason: str
    description: str | None = None


class ReportResponse(BaseModel):
    id: int
    reporter_id: int
    reported_user_id: int
    reason: str
    description: str | None
    created_at: datetime

    report_count: int | None = None
    flagged_for_review: bool | None = None

    class Config:
        from_attributes = True