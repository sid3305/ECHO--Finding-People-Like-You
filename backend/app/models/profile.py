from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.base import Base


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True
    )

    age: Mapped[int] = mapped_column(
        Integer
    )

    gender: Mapped[str] = mapped_column(
        String(20)
    )

    friend_preference: Mapped[str] = mapped_column(
        String(20)
    )

    zodiac_sign: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    bio: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )