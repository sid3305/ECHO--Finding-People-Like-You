from fastapi import FastAPI

from app.routers.auth_router import router as auth_router
from app.routers.profile_router import (router as profile_router)
from app.routers.mbti_router import (router as mbti_router)
from app.routers.interest_router import (router as interest_router)
from app.routers.recommendation_router import (
    router as recommendation_router
)

app = FastAPI(
    title="ECHO API"
)

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(mbti_router)
app.include_router(interest_router)
app.include_router(recommendation_router)

@app.get("/")
def root():
    return {
        "message": "ECHO Backend Running"
    }