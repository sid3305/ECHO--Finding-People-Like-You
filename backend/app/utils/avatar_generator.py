from urllib.parse import quote


def generate_avatar(username: str) -> str:

    seed = quote(username)

    return (
        "https://api.dicebear.com/9.x/adventurer/svg"
        f"?seed={seed}"
    )