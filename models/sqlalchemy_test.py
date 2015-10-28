import datetime

from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    user_name = Column(String(50), nullable=False, unique=True)


class Game(Base):
    __tablename__ = 'games'
    id = Column(Integer, primary_key=True)
    x_user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    x_user = relationship("User", foreign_keys=[x_user_id], backref='x_games')
    o_user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    o_user = relationship("User", foreign_keys=[o_user_id], backref='o_games')
    start = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    end = Column(DateTime)


engine = create_engine("mysql://root:NewAppearances@localhost/TicTacToe")

Base.metadata.create_all(engine)
