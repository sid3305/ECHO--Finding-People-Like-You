import pandas as pd

from app.ai.embedding_generator import generate_interest_embedding
from app.ai.similarity_engine import calculate_interest_similarity
from app.data.mbti_compatibility import MBTI_COMPATIBILITY
from app.data.zodiac_compatibility import ZODIAC_COMPATIBILITY
from datetime import date
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]
DATASET_PATH = BASE_DIR / "docs" / "ai_dataset"


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


def get_user_mbti(user_id: int, mbti_results) -> str | None:
    user_mbti_row = mbti_results[
        mbti_results["user_id"] == user_id
    ]

    if user_mbti_row.empty:
        return None

    return user_mbti_row.iloc[0]["mbti_type"]

def get_user_gender(user_id: int, profiles) -> str | None:
    user_profile_row = profiles[
        profiles["user_id"] == user_id
    ]

    if user_profile_row.empty:
        return None

    gender = user_profile_row.iloc[0].get("gender")

    if pd.isna(gender):
        return None

    return gender

def get_user_age(user_id: int, profiles) -> int | None:
    user_profile_row = profiles[
        profiles["user_id"] == user_id
    ]

    if user_profile_row.empty:
        return None

    dob = user_profile_row.iloc[0].get("date_of_birth")

    if pd.isna(dob):
        return None

    birth_date = pd.to_datetime(dob).date()
    today = date.today()

    age = today.year - birth_date.year

    if (today.month, today.day) < (birth_date.month, birth_date.day):
        age -= 1

    return age

def get_user_zodiac(user_id: int, profiles) -> str | None:
    user_profile_row = profiles[
        profiles["user_id"] == user_id
    ]

    if user_profile_row.empty:
        return None

    zodiac = user_profile_row.iloc[0].get("zodiac_sign")

    if pd.isna(zodiac):
        return None

    return zodiac


def get_mbti_score(user_mbti: str | None, other_mbti: str | None) -> float:
    if not user_mbti or not other_mbti:
        return 0.0

    compatibility = MBTI_COMPATIBILITY.get(user_mbti)

    if not compatibility:
        return 0.0

    if other_mbti in compatibility.get("high", []):
        return 1.0

    if other_mbti in compatibility.get("moderate", []):
        return 0.6

    return 0.3


def get_zodiac_score(user_zodiac: str | None, other_zodiac: str | None) -> float:
    if not user_zodiac or not other_zodiac:
        return 0.0

    compatibility = ZODIAC_COMPATIBILITY.get(user_zodiac, {})

    raw_score = compatibility.get(other_zodiac, 1)

    return raw_score / 3


def calculate_final_match_score(
    interest_similarity: float,
    mbti_score: float,
    zodiac_score: float
) -> float:
    final_score = (
        0.7 * interest_similarity
        + 0.2 * mbti_score
        + 0.1 * zodiac_score
    )

    return round(final_score, 4)


def get_top_interest_matches(
    user_id: int,
    top_n: int = 5,
    gender: str | None = None,
    min_age: int | None = None,
    max_age: int | None = None
):
    users, profiles, interests, user_interests, mbti_results = load_ai_dataset()

    target_interests = get_user_interest_names(
        user_id,
        interests,
        user_interests
    )

    if not target_interests:
        return []

    target_embedding = generate_interest_embedding(target_interests)
    target_mbti = get_user_mbti(user_id, mbti_results)
    target_zodiac = get_user_zodiac(user_id, profiles)

    match_results = []

    for other_user_id in users["id"].tolist():
        if other_user_id == user_id:
            continue

        if gender and gender.lower() != "all":
            other_profile = profiles[
                profiles["user_id"] == other_user_id
            ]

            if other_profile.empty:
                continue

            other_gender = other_profile.iloc[0]["gender"]

            if str(other_gender).lower() != gender.lower():
                continue

        # ADD AGE FILTER HERE
        other_age = get_user_age(
            other_user_id,
            profiles
        )

        if min_age is not None:
            if other_age is None or other_age < min_age:
                continue

        if max_age is not None:
            if other_age is None or other_age > max_age:
                continue

        other_age = get_user_age(
            other_user_id,
            profiles
        )

        if min_age is not None:
            if other_age is None or other_age < min_age:
                continue

        if max_age is not None:
            if other_age is None or other_age > max_age:
                continue

        other_interests = get_user_interest_names(
            other_user_id,
            interests,
            user_interests
        )

        if not other_interests:
            continue

        other_embedding = generate_interest_embedding(other_interests)

        interest_similarity = calculate_interest_similarity(
            target_embedding,
            other_embedding
        )

        other_mbti = get_user_mbti(other_user_id, mbti_results)
        other_zodiac = get_user_zodiac(other_user_id, profiles)

        mbti_score = get_mbti_score(target_mbti, other_mbti)
        zodiac_score = get_zodiac_score(target_zodiac, other_zodiac)

        final_score = calculate_final_match_score(
            interest_similarity,
            mbti_score,
            zodiac_score
        )

        match_results.append({
            "user_id": int(other_user_id),
            "interest_similarity": interest_similarity,
            "mbti_score": mbti_score,
            "zodiac_score": round(zodiac_score, 4),
            "final_score": final_score,
            "interests": other_interests,
            "mbti": other_mbti,
            "zodiac": other_zodiac,
            "gender": get_user_gender(other_user_id, profiles),
            "age": get_user_age(other_user_id, profiles)
        })

    match_results = sorted(
        match_results,
        key=lambda x: x["final_score"],
        reverse=True
    )

    return match_results[:top_n]