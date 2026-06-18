from pydantic import BaseModel
from datetime import datetime


class BlockCreate(BaseModel):
    blocked_user_id: int


class BlockResponse(BaseModel):
    id: int
    blocker_id: int
    blocked_id: int
    created_at: datetime

    class Config:
        from_attributes = True