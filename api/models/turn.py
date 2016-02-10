from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from api.models import db


class Turn(db.Model):
    ###
    # A turn in a game
    ###
    __tablename__ = 'game_turns'
    turn_number = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, ForeignKey('games.id'), primary_key=True,)
    game = relationship("Game", foreign_keys=[game_id], backref='game_turns')
