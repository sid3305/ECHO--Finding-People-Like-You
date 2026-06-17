from app.ai.recommendation_engine import get_top_interest_matches


def get_user_recommendations(
    user_id: int,
    top_n: int = 5,
    gender: str | None = None
):
    matches = get_top_interest_matches(
        user_id=user_id,
        top_n=top_n,
        gender=gender
    )

    return {
        "user_id": user_id,
        "filters": {
            "top_n": top_n,
            "gender": gender
        },
        "matches": matches
    }