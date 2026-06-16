import random

from faker import Faker

from app.database.db import SessionLocal

from app.models.user import User
from app.models.profile import Profile
from app.models.interest import Interest
from app.models.mbti_result import MBTIResult
from app.models.user_interest import UserInterest

from app.utils.zodiac import get_zodiac_sign


fake = Faker()


MBTI_TYPES = [
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP"
]

GENDERS = [
    "male",
    "female"
]

FRIEND_PREFERENCES = [
    "male",
    "female",
    "any"
]

BIO_TEMPLATES = [
    "Coffee lover and weekend traveler.",
    "Always looking for new books to read.",
    "Tech enthusiast who enjoys gaming.",
    "Fitness addict and foodie.",
    "Music keeps me sane.",
    "Aspiring developer exploring AI.",
    "Anime fan and creative thinker.",
    "Nature lover who enjoys photography.",
    "Movie buff looking for good conversations.",
    "Sports enthusiast and lifelong learner.",
    "Love meeting new people and learning new things.",
    "Programming during the day, gaming at night.",
]

def create_user(db):

    user = User(
        email=fake.unique.email(),
        password_hash="seed_password_hash",
        anonymous_username=fake.unique.user_name(),
        avatar_url=None,
        is_verified=True
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def create_profile(db, user):

    dob = fake.date_of_birth(
        minimum_age=18,
        maximum_age=35
    )

    profile = Profile(
        user_id=user.id,
        date_of_birth=dob,
        gender=random.choice(GENDERS),
        friend_preference=random.choice(
            FRIEND_PREFERENCES
        ),
        zodiac_sign=get_zodiac_sign(dob),
        bio=random.choice(BIO_TEMPLATES)
    )

    db.add(profile)
    db.commit()

def create_mbti_result(db, user):

    mbti = MBTIResult(
        user_id=user.id,
        mbti_type=random.choice(MBTI_TYPES)
    )

    db.add(mbti)
    db.commit()

def assign_interests(db, user):

    all_interests = db.query(
        Interest
    ).all()

    selected_interests = random.sample(
        all_interests,
        random.randint(3, 8)
    )

    for interest in selected_interests:

        db.add(
            UserInterest(
                user_id=user.id,
                interest_id=interest.id
            )
        )

    db.commit()

def create_complete_user(db):

    user = create_user(db)

    create_profile(db, user)

    create_mbti_result(db, user)

    assign_interests(db, user)

    print(
        f"Created User {user.id}"
    )

def seed_users():

    db = SessionLocal()

    try:

        for _ in range(100):

            create_complete_user(db)

        print(
            "\nFinished seeding 100 users!"
        )

    finally:

        db.close()


if __name__ == "__main__":

    seed_users()