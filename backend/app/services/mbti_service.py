from app.models.mbti_result import MBTIResult


def create_mbti(
    db,
    user_id,
    mbti_type
):

    mbti = MBTIResult(
        user_id=user_id,
        mbti_type=mbti_type
    )

    db.add(mbti)
    db.commit()
    db.refresh(mbti)

    return mbti