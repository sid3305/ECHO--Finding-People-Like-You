from pydantic import BaseModel


class ProfileCreate(BaseModel):
    age: int
    gender: str
    friend_preference: str
    zodiac_sign: str | None = None
    bio: str | None = None


class ProfileResponse(ProfileCreate):
    id: int
    user_id: int

    model_config = {
        "from_attributes": True
    }