from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.hybrid import hybrid_property

from models import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)

    user_name = Column(String(50), nullable=False, unique=True)
    email = Column(String(255))

    wins = Column(Integer, default=0)
    losses = Column(Integer, default=0)
    ties = Column(Integer, default=0)
    unfinished = Column(Integer, default=0)

    @hybrid_property
    def games(self):
        return self.wins + self.losses + self.ties + self.unfinished
