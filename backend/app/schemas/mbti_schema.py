from pydantic import BaseModel


class MBTICreate(BaseModel):
    mbti_type: str


class MBTIResponse(BaseModel):
    id: int
    user_id: int
    mbti_type: str

    class Config:
        from_attributes = True