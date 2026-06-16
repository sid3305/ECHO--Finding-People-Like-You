import random


adjectives = [
    "Silent", "Happy", "Curious", "Brave", "Mystic",
    "Hidden", "Golden", "Silver", "Crimson", "Emerald",
    "Velvet", "Swift", "Gentle", "Fearless", "Clever",
    "Radiant", "Shadow", "Glowing", "Frozen", "Burning",
    "Wandering", "Dreaming", "Cosmic", "Luminous", "Electric",
    "Secret", "Ancient", "Fierce", "Calm", "Daring",
    "Majestic", "Lucky", "Noble", "Playful", "Wild",
    "Vivid", "Eternal", "Bright", "Dark", "Shining",
    "Whispering", "Roaming", "Bold", "Peaceful", "Infinite",
    "Magical", "Quantum", "Stellar", "Echoing", "Celestial"
]

animals = [
    "Wolf", "Fox", "Panda", "Tiger", "Falcon",
    "Raven", "Phoenix", "Dragon", "Leopard", "Otter",
    "Lynx", "Jaguar", "Orca", "Panther", "Eagle",
    "Hawk", "Bear", "Dolphin", "Cobra", "Viper",
    "Turtle", "Rabbit", "Deer", "Bison", "Moose",
    "Penguin", "Shark", "Whale", "Cheetah", "Lion",
    "Hyena", "Koala", "Peacock", "Swan", "Owl",
    "Parrot", "Crane", "Buffalo", "Camel", "Horse",
    "Zebra", "Gorilla", "Chimp", "Mongoose", "Badger",
    "Sparrow", "Crow", "Seahorse", "Octopus", "Puma"
]

cosmic_words = [
    "Nova",
    "Nebula",
    "Galaxy",
    "Aurora",
    "Comet",
    "Meteor",
    "Orbit",
    "Cosmos",
    "Quasar",
    "Eclipse",
    "Asteroid",
    "Pulsar",
    "Zenith",
    "Solstice",
    "Equinox",
    "Supernova",
    "Starlight",
    "Moonbeam",
    "Sunflare",
    "Void"
]


def generate_username():
    return (
        random.choice(adjectives)
        + random.choice(animals)
        + random.choice(cosmic_words)
        + str(random.randint(1000, 9999))
    )