from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import ForeignKey

from app.database.base import Base


class UserInterest(Base):

    __tablename__ = "user_interests"

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        primary_key=True
    )

    interest_id = Column(
        Integer,
        ForeignKey("interests.id"),
        primary_key=True
    )