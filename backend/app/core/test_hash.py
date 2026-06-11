from app.core.security import hash_password
from app.core.security import verify_password


password = "mypassword"

hashed = hash_password(password)

print("HASH:", hashed)

print(
    verify_password(
        password,
        hashed
    )
)