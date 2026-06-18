from sqlalchemy.orm import Session

from app.models.report import Report


def create_report(
    db: Session,
    reporter_id: int,
    reported_user_id: int,
    reason: str,
    description: str | None = None
):
    report = Report(
        reporter_id=reporter_id,
        reported_user_id=reported_user_id,
        reason=reason,
        description=description
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report


def get_reports(
    db: Session
):
    return (
        db.query(Report)
        .order_by(Report.created_at.desc())
        .all()
    )

def get_report_count(
    db: Session,
    reported_user_id: int
):
    return (
        db.query(Report)
        .filter(
            Report.reported_user_id == reported_user_id
        )
        .count()
    )