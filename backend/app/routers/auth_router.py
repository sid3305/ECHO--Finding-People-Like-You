from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.auth_schema import (UserSignup,UserLogin,UserResponse,UsernameUpdate,MessageResponse,Token)

from app.services.auth_service import (create_user,get_user_by_email,authenticate_user,save_otp,verify_otp,generate_unique_username)
from app.core.security import (create_access_token)
from app.core.dependencies import get_current_user
from app.models.user import User
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Form
from app.services.otp_service import (generate_otp)
from app.schemas.otp_schema import OTPVerify
from app.database import db

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/signup",
    response_model=UserResponse
)
def signup(
    user: UserSignup,
    db: Session = Depends(get_db)
):

    existing_user = get_user_by_email(
        db,
        user.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    username = generate_unique_username(db)

    return create_user(
        db,
        user,
        username
    )

@router.post(
    "/login",
    response_model=Token
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/token")
def login_for_swagger(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = authenticate_user(
        db,
        form_data.username,
        form_data.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get(
    "/me",
    response_model=UserResponse
)
def get_me(
    current_user: User = Depends(
        get_current_user
    )
):
    return current_user

@router.patch(
    "/username",
    response_model=MessageResponse
)
def update_username(
    username_data: UsernameUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    username = username_data.username.strip()

    if len(username) < 3:
        raise HTTPException(
            status_code=400,
            detail="Username must be at least 3 characters"
        )

    if len(username) > 30:
        raise HTTPException(
            status_code=400,
            detail="Username must be at most 30 characters"
        )

    existing_user = (
        db.query(User)
        .filter(
            User.anonymous_username == username
        )
        .first()
    )

    if existing_user and existing_user.id != current_user.id:
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )

    from app.utils.avatar_generator import (generate_avatar)

    current_user.anonymous_username = username

    current_user.avatar_url = generate_avatar(username)

    db.commit()

    return {
        "message": "Username updated successfully"
    }

@router.post("/send-otp")
def send_otp(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db)
):

    otp = generate_otp()

    save_otp(
        db,
        current_user,
        otp
    )

    print(
        f"OTP for {current_user.email}: {otp}"
    )

    return {
        "message": "OTP generated"
    }

@router.post("/verify-otp")
def verify_user_otp(
    otp_data: OTPVerify,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if not verify_otp(
        current_user,
        otp_data.otp
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    current_user.is_verified = True

    current_user.otp_code = None
    current_user.otp_expiry = None

    db.commit()

    return {
        "message": "User verified successfully"
    }