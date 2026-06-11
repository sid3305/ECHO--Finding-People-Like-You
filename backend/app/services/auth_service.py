from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth_schema import UserSignup
from app.core.security import hash_password
from datetime import datetime
from datetime import timedelta

from app.core.security import (verify_password)

def create_user(db: Session, user_data: UserSignup, username: str):
    user = User(
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        anonymous_username=username,
        is_verified=False
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_user_by_email(db: Session, email: str):
    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

def authenticate_user(db: Session, email: str, password: str):

    user = get_user_by_email(
        db,
        email
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.password_hash
    ):
        return None

    return user

def save_otp(db,user,otp):

    user.otp_code = otp

    user.otp_expiry = (
        datetime.now()
        + timedelta(minutes=10)
    )

    db.commit()

def verify_otp(user,otp: str):

    if user.otp_code != otp:
        return False

    if user.otp_expiry is None:
        return False

    if user.otp_expiry < datetime.now():
        return False

    return True