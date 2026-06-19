from datetime import date

from sqlalchemy.orm import Session

from app.ai.embedding_generator import generate_interest_embedding
from app.ai.similarity_engine import calculate_interest_similarity
from app.data.mbti_compatibility import MBTI_COMPATIBILITY
from app.data.zodiac_compatibility import ZODIAC_COMPATIBILITY

from app.models.user import User
from app.models.profile import Profile
from app.models.interest import Interest
from app.models.user_interest import UserInterest
from app.models.mbti_result import MBTIResult
from app.models.block import Block
from app.models.match import Match

def get_user_interests(db: Session, user_id: int) -> list[str]:
    """
    Fetch all interest names for a user from the database.
    """
    interests = (
        db.query(Interest.interest_name)
        .join(UserInterest, UserInterest.interest_id == Interest.id)
        .filter(UserInterest.user_id == user_id)
        .all()
    )

    return [interest[0] for interest in interests]


def get_user_profile(db: Session, user_id: int):
    """
    Fetch user's profile row.
    """
    return (
        db.query(Profile)
        .filter(Profile.user_id == user_id)
        .first()
    )


def get_user_mbti(db: Session, user_id: int) -> str | None:
    """
    Fetch user's MBTI type.
    """
    result = (
        db.query(MBTIResult)
        .filter(MBTIResult.user_id == user_id)
        .first()
    )

    if not result:
        return None

    return result.mbti_type


def get_blocked_user_ids(db: Session, user_id: int) -> set[int]:
    """
    Users blocked by current user.
    """
    blocked = (
        db.query(Block.blocked_id)
        .filter(Block.blocker_id == user_id)
        .all()
    )

    return {row[0] for row in blocked}


def get_users_who_blocked_current_user(db: Session, user_id: int) -> set[int]:
    """
    Users who blocked current user.
    """
    blockers = (
        db.query(Block.blocker_id)
        .filter(Block.blocked_id == user_id)
        .all()
    )

    return {row[0] for row in blockers}


def get_excluded_user_ids(db: Session, user_id: int) -> set[int]:
    """
    Collect all users who should not appear in recommendations.
    """
    excluded_ids = {user_id}

    excluded_ids.update(get_blocked_user_ids(db, user_id))
    excluded_ids.update(get_users_who_blocked_current_user(db, user_id))

    return excluded_ids

def calculate_age(dob: date | None) -> int | None:
    if not dob:
        return None

    today = date.today()

    return (
        today.year
        - dob.year
        - ((today.month, today.day) < (dob.month, dob.day))
    )


def get_mbti_score(
    current_mbti: str | None,
    candidate_mbti: str | None
) -> float:

    if not current_mbti or not candidate_mbti:
        return 0

    compatibility = MBTI_COMPATIBILITY.get(
        current_mbti.upper()
    )

    if not compatibility:
        return 0

    if candidate_mbti.upper() in compatibility["high"]:
        return 1.0

    if candidate_mbti.upper() in compatibility["moderate"]:
        return 0.5

    return 0


def get_zodiac_score(current_zodiac: str | None, candidate_zodiac: str | None) -> float:
    if not current_zodiac or not candidate_zodiac:
        return 0

    compatible_signs = ZODIAC_COMPATIBILITY.get(current_zodiac.title(), [])

    if candidate_zodiac.title() in compatible_signs:
        return 1

    return 0


def get_match_level(final_score: float) -> str:
    if final_score >= 0.70:
        return "High"

    if final_score >= 0.45:
        return "Medium"

    return "Low"


def build_match_reason(
    interest_score: float,
    mbti_score: float,
    zodiac_score: float
) -> str:
    reasons = []

    if interest_score >= 0.70:
        reasons.append("Strong shared interests")

    if mbti_score > 0:
        reasons.append("Compatible MBTI personalities")

    if zodiac_score > 0:
        reasons.append("Compatible zodiac signs")

    if not reasons:
        reasons.append("Some profile similarity found")

    return ", ".join(reasons)


def get_candidate_users(db: Session, current_user_id: int) -> list[User]:
    """
    Fetch users who can be considered for recommendation.
    Excludes:
    - current user
    - suspended users
    - blocked users
    - users who blocked current user
    """

    excluded_ids = get_excluded_user_ids(db, current_user_id)

    candidates = (
        db.query(User)
        .filter(User.id.notin_(excluded_ids))
        .filter(User.is_suspended == False)
        .all()
    )

    return candidates


def score_candidate(
    db: Session,
    current_user_id: int,
    candidate_user: User
):
    """
    Calculate recommendation score for one candidate.
    """

    current_profile = get_user_profile(db, current_user_id)
    candidate_profile = get_user_profile(db, candidate_user.id)

    if not current_profile or not candidate_profile:
        return None

    current_interests = get_user_interests(db, current_user_id)
    candidate_interests = get_user_interests(db, candidate_user.id)

    current_embedding = generate_interest_embedding(
        current_interests
    )

    candidate_embedding = generate_interest_embedding(
        candidate_interests
    )

    interest_score = calculate_interest_similarity(
        current_embedding,
        candidate_embedding
    )

    current_mbti = get_user_mbti(
        db,
        current_user_id
    )

    candidate_mbti = get_user_mbti(
        db,
        candidate_user.id
    )

    mbti_score = get_mbti_score(
        current_mbti,
        candidate_mbti
    )

    zodiac_score = get_zodiac_score(
        current_profile.zodiac_sign,
        candidate_profile.zodiac_sign
    )

    final_score = (
        interest_score * 0.70
        + mbti_score * 0.20
        + zodiac_score * 0.10
    )

    return {
        "user_id": candidate_user.id,
        "username": candidate_user.anonymous_username,
        "final_score": round(final_score, 4),
        "match_level": get_match_level(final_score),
        "match_reason": build_match_reason(
            interest_score,
            mbti_score,
            zodiac_score
        ),
        "interest_score": round(interest_score, 4),
        "mbti_score": mbti_score,
        "zodiac_score": zodiac_score,
    }


def get_recommendations(
    db: Session,
    current_user_id: int,
    limit: int = 10
):
    """
    Generate top recommendations for the current user.
    """

    candidates = get_candidate_users(
        db,
        current_user_id
    )

    recommendations = []

    for candidate in candidates:
        result = score_candidate(
            db,
            current_user_id,
            candidate
        )

        if result:
            recommendations.append(result)

    recommendations.sort(
        key=lambda item: item["final_score"],
        reverse=True
    )

    return recommendations[:limit]
