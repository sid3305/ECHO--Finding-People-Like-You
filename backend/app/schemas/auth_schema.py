from pydantic import BaseModel
from pydantic import EmailStr


class UserSignup(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    anonymous_username: str
    avatar_url: str | None = None
    is_verified: bool

    model_config = {
        "from_attributes": True
    }

class UsernameUpdate(BaseModel):
    username: str


class MessageResponse(BaseModel):
    message: str

class Token(BaseModel):
    access_token: str
    token_type: str