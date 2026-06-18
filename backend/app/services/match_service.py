from sqlalchemy.orm import Session

from app.models.match import Match


def create_match_request(
    db: Session,
    requester_id: int,
    receiver_id: int
):
    match = Match(
        requester_id=requester_id,
        receiver_id=receiver_id,
        status="pending"
    )

    db.add(match)
    db.commit()
    db.refresh(match)

    return match


def accept_match(
    db: Session,
    match: Match
):
    match.status = "accepted"

    db.commit()
    db.refresh(match)

    return match


def reject_match(
    db: Session,
    match: Match
):
    match.status = "rejected"

    db.commit()
    db.refresh(match)

    return match


def get_user_matches(
    db: Session,
    user_id: int
):
    return (
        db.query(Match)
        .filter(
            (Match.requester_id == user_id)
            | (Match.receiver_id == user_id)
        )
        .all()
    )