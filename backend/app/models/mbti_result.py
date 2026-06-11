from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime

from datetime import datetime

from app.database.base import Base


class MBTIResult(Base):

    __tablename__ = "mbti_results"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        unique=True
    )

    mbti_type = Column(
        String(10),
        nullable=False
    )

    test_date = Column(
        DateTime,
        default=datetime.utcnow
    )