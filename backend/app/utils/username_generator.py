import random


adjectives = [
    "Silent",
    "Happy",
    "Curious",
    "Brave",
    "Mystic"
]

animals = [
    "Fox",
    "Wolf",
    "Panda",
    "Tiger",
    "Falcon"
]


def generate_username():
    return (
        random.choice(adjectives)
        + random.choice(animals)
        + str(random.randint(1000, 9999))
    )