from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth_schema import UserSignup
from app.core.security import hash_password
from datetime import datetime
from datetime import timedelta
from app.utils.username_generator import generate_username
from app.utils.avatar_generator import generate_avatar

from app.core.security import (verify_password)

def create_user(
    db: Session,
    user_data: UserSignup,
    username: str
):

    avatar_url = generate_avatar(
        username
    )

    user = User(
        email=user_data.email,
        password_hash=hash_password(
            user_data.password
        ),
        anonymous_username=username,
        avatar_url=avatar_url,
        is_verified=False
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def generate_unique_username(db: Session):

    while True:

        username = generate_username()

        existing_user = (
            db.query(User)
            .filter(
                User.anonymous_username == username
            )
            .first()
        )

        if not existing_user:
            return username
        
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