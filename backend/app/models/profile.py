from sqlalchemy import ForeignKey
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from datetime import date
from sqlalchemy import Date

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

    date_of_birth: Mapped[date] = mapped_column(
        Date
    )

    gender: Mapped[str] = mapped_column(
        String(20)
    )

    friend_preference: Mapped[str] = mapped_column(
        String(20)
    )

    zodiac_sign: Mapped[str | None] = mapped_column(
        String(20),
        nullable=False
    )

    bio: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )