from datetime import date
from pydantic import BaseModel


class ProfileCreate(BaseModel):
    date_of_birth: date
    gender: str
    friend_preference: str
    bio: str | None = None


class ProfileResponse(BaseModel):

    id: int
    user_id: int

    date_of_birth: date

    age: int

    zodiac_sign: str

    gender: str
    friend_preference: str

    bio: str | None = None

    model_config = {
        "from_attributes": True
    }