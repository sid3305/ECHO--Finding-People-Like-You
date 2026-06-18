from datetime import datetime

from pydantic import BaseModel


class MatchRequest(BaseModel):
    receiver_id: int


class MatchResponse(BaseModel):
    id: int
    requester_id: int
    receiver_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True