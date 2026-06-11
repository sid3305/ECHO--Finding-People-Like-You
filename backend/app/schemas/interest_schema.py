from pydantic import BaseModel


class InterestCreate(BaseModel):
    interest_name: str


class InterestResponse(BaseModel):
    id: int
    interest_name: str

    model_config = {
        "from_attributes": True
    }