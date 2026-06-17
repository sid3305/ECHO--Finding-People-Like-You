from app.ai.recommendation_engine import get_top_interest_matches


def get_user_recommendations(
    user_id: int,
    top_n: int = 5
):
    matches = get_top_interest_matches(
        user_id=user_id,
        top_n=top_n
    )

    return {
        "user_id": user_id,
        "matches": matches
    }