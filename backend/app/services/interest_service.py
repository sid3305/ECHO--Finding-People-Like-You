from app.models.interest import Interest
from app.models.user_interest import UserInterest


def create_interest(
    db,
    interest_name: str
):

    interest = Interest(
        interest_name=interest_name
    )

    db.add(interest)
    db.commit()
    db.refresh(interest)

    return interest


def get_all_interests(db):

    return db.query(Interest).all()


def add_interest_to_user(
    db,
    user_id: int,
    interest_id: int
):

    user_interest = UserInterest(
        user_id=user_id,
        interest_id=interest_id
    )

    db.add(user_interest)
    db.commit()

    return user_interest