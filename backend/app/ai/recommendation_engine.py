import pandas as pd

from app.ai.embedding_generator import generate_interest_embedding
from app.ai.similarity_engine import calculate_interest_similarity


DATASET_PATH = "docs/ai_dataset"


def load_ai_dataset():
    users = pd.read_csv(f"{DATASET_PATH}/users.csv")
    profiles = pd.read_csv(f"{DATASET_PATH}/profiles.csv")
    interests = pd.read_csv(f"{DATASET_PATH}/interests.csv")
    user_interests = pd.read_csv(f"{DATASET_PATH}/user_interests.csv")
    mbti_results = pd.read_csv(f"{DATASET_PATH}/mbti_results.csv")

    return users, profiles, interests, user_interests, mbti_results


def get_user_interest_names(user_id: int, interests, user_interests) -> list[str]:
    user_interest_ids = user_interests[
        user_interests["user_id"] == user_id
    ]["interest_id"].tolist()

    interest_names = interests[
        interests["id"].isin(user_interest_ids)
    ]["interest_name"].tolist()

    return interest_names


def get_top_interest_matches(user_id: int, top_n: int = 5):
    users, profiles, interests, user_interests, mbti_results = load_ai_dataset()

    target_interests = get_user_interest_names(
        user_id,
        interests,
        user_interests
    )

    if not target_interests:
        return []

    target_embedding = generate_interest_embedding(target_interests)

    match_results = []

    for other_user_id in users["id"].tolist():
        if other_user_id == user_id:
            continue

        other_interests = get_user_interest_names(
            other_user_id,
            interests,
            user_interests
        )

        if not other_interests:
            continue

        other_embedding = generate_interest_embedding(other_interests)

        score = calculate_interest_similarity(
            target_embedding,
            other_embedding
        )

        match_results.append({
            "user_id": int(other_user_id),
            "interest_similarity": score,
            "interests": other_interests
        })

    match_results = sorted(
        match_results,
        key=lambda x: x["interest_similarity"],
        reverse=True
    )

    return match_results[:top_n]