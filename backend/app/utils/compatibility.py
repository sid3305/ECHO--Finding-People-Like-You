from app.data.mbti_compatibility import MBTI_COMPATIBILITY
from app.data.zodiac_compatibility import ZODIAC_COMPATIBILITY


def get_mbti_compatibility(user_mbti: str, target_mbti: str):
    user_mbti = user_mbti.upper()
    target_mbti = target_mbti.upper()

    if user_mbti not in MBTI_COMPATIBILITY:
        return {
            "score": 40,
            "level": "low"
        }

    compatibility = MBTI_COMPATIBILITY[user_mbti]

    if target_mbti in compatibility["high"]:
        return {
            "score": 100,
            "level": "high"
        }

    if target_mbti in compatibility["moderate"]:
        return {
            "score": 75,
            "level": "moderate"
        }

    return {
        "score": 50,
        "level": "low"
    }


def get_zodiac_compatibility(sign1: str, sign2: str):
    sign1 = sign1.title()
    sign2 = sign2.title()

    value = (
        ZODIAC_COMPATIBILITY
        .get(sign1, {})
        .get(sign2, 1)
    )

    if value == 3:
        return {
            "score": 100,
            "level": "high"
        }

    if value == 2:
        return {
            "score": 75,
            "level": "moderate"
        }

    return {
        "score": 50,
        "level": "low"
    }