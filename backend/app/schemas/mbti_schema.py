from pydantic import BaseModel


# Existing manual endpoint

class MBTICreate(BaseModel):
    mbti_type: str


# Existing response

class MBTIResponse(BaseModel):
    id: int
    user_id: int
    mbti_type: str

    class Config:
        from_attributes = True


# New MBTI test answer

class MBTIAnswer(BaseModel):
    question_id: int
    value: int


# New MBTI test request

class MBTITestRequest(BaseModel):
    answers: list[MBTIAnswer]


# Questions response

class MBTIQuestionResponse(BaseModel):
    id: int
    question: str


# MBTI test result response

class MBTITestResponse(BaseModel):

    mbti_type: str

    scores: dict

    confidence: dict

    tiebreakers_needed: dict