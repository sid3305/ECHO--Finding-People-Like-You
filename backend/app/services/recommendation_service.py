from app.ai.recommendation_engine import get_top_interest_matches


def get_user_recommendations(
    user_id: int,
    top_n: int = 5,
    gender: str | None = None,
    min_age: int | None = None,
    max_age: int | None = None,
    respect_preference: bool = False
):
    matches = get_top_interest_matches(
        user_id=user_id,
        top_n=top_n,
        gender=gender,
        min_age=min_age,
        max_age=max_age,
        respect_preference=respect_preference
    )

    return {
        "user_id": user_id,
        "filters": {
            "top_n": top_n,
            "gender": gender,
            "min_age": min_age,
            "max_age": max_age,
            "respect_preference": respect_preference
        },
        "matches": matches
    }