from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.base import Base


class Interest(Base):

    __tablename__ = "interests"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    interest_name = Column(
        String(100),
        unique=True,
        nullable=False
    )