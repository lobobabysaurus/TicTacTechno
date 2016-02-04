from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from api.models import Base


class Turn(Base):
    ###
    # A turn in a game
    ###
    __tablename__ = 'game_turns'
    turn_number = Column(Integer, primary_key=True)
    game_id = Column(Integer, ForeignKey('games.id'), primary_key=True,)
    game = relationship("Game", foreign_keys=[game_id], backref='game_turns')
