import datetime

from sqlalchemy import Column, Boolean, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from models import Base


class Game(Base):
    __tablename__ = 'games'
    id = Column(Integer, primary_key=True)
    
    x_user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    x_user = relationship("User", foreign_keys=[x_user_id], backref='x_games')
    o_user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    o_user = relationship("User", foreign_keys=[o_user_id], backref='o_games')

    start = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    end = Column(DateTime)
    finished = Column(Boolean, default=False)

    turn = Column(Integer, default=1)
    north_west = Column(String(1), default='')
    north = Column(String(1), default='')
    north_east = Column(String(1), default='')
    west = Column(String(1), default='')
    center = Column(String(1), default='')
    east = Column(String(1), default='')
    south_west = Column(String(1), default='')
    south = Column(String(1), default='')
    south_east = Column(String(1), default='')
