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


CLUSTERS = {
    "tech": {
        "interests": [
            "Programming",
            "AI",
            "Machine Learning",
            "Technology",
            "Gaming"
        ],
        "bios": [
            "AI enthusiast and software developer.",
            "Building projects and learning new technologies.",
            "Programming during the day, gaming at night.",
            "Tech lover interested in machine learning.",
            "Passionate about coding and innovation."
        ]
    },

    "creative": {
        "interests": [
            "Art",
            "Drawing",
            "Photography",
            "Writing",
            "Music"
        ],
        "bios": [
            "Photography and art are my favorite hobbies.",
            "Creative thinker who loves music and design.",
            "Always working on a new creative project.",
            "Art lover looking for meaningful conversations.",
            "Music and creativity inspire me every day."
        ]
    },

    "fitness": {
        "interests": [
            "Gym",
            "Fitness",
            "Running",
            "Yoga",
            "Sports"
        ],
        "bios": [
            "Fitness enthusiast who enjoys staying active.",
            "Gym lover and lifelong learner.",
            "Running helps me clear my mind.",
            "Always looking for workout buddies.",
            "Health and consistency are important to me."
        ]
    },

    "entertainment": {
        "interests": [
            "Movies",
            "Anime",
            "Manga",
            "Gaming",
            "Music"
        ],
        "bios": [
            "Anime fan and movie enthusiast.",
            "Gaming and music are my escape.",
            "Always searching for the next great show.",
            "Love discussing anime and movies.",
            "Entertainment keeps life interesting."
        ]
    },

    "science": {
        "interests": [
            "Science",
            "Astronomy",
            "Technology",
            "Reading"
        ],
        "bios": [
            "Curious about science and the universe.",
            "Astronomy nerd and technology enthusiast.",
            "Love reading about new discoveries.",
            "Science keeps me fascinated.",
            "Always exploring how the world works."
        ]
    }
}


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


def create_profile(db, user, cluster):

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
        bio=random.choice(cluster["bios"])
    )

    db.add(profile)
    db.commit()


def create_mbti_result(db, user):

    result = MBTIResult(
        user_id=user.id,
        mbti_type=random.choice(MBTI_TYPES)
    )

    db.add(result)
    db.commit()


def assign_interests(db, user, cluster):

    selected_names = random.sample(
        cluster["interests"],
        random.randint(
            min(3, len(cluster["interests"])),
            len(cluster["interests"])
        )
    )

    for interest_name in selected_names:

        interest = (
            db.query(Interest)
            .filter(
                Interest.interest_name == interest_name
            )
            .first()
        )

        if interest:

            db.add(
                UserInterest(
                    user_id=user.id,
                    interest_id=interest.id
                )
            )

    db.commit()


def create_complete_user(db):

    cluster = random.choice(
        list(CLUSTERS.values())
    )

    user = create_user(db)

    create_profile(
        db,
        user,
        cluster
    )

    create_mbti_result(
        db,
        user
    )

    assign_interests(
        db,
        user,
        cluster
    )

    print(
        f"Created User {user.id}"
    )


def seed_users(num_users=300):

    db = SessionLocal()

    try:

        for _ in range(num_users):

            create_complete_user(db)

        print(
            f"\nFinished seeding {num_users} users!"
        )

    finally:

        db.close()


if __name__ == "__main__":

    seed_users(300)