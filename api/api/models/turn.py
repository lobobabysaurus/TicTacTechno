from sqlalchemy import ForeignKey
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship

from api.models import db


class Turn(db.Model):
    __tablename__ = 'game_turns'

    id = db.Column(db.Integer, primary_key=True)

    position = db.Column(db.Enum('temp val'), nullable=False)
    turn_number = db.Column(db.Integer, default=1)

    game_id = db.Column(db.Integer, ForeignKey('games.id'), primary_key=True,)
    game = relationship('Game', foreign_keys=[game_id], backref='game_turns')

    player_id = db.Column(db.Integer, ForeignKey('users.id'))
    player = relationship('User', foreign_keys=[player_id],
                          backref='user_turns')

    @hybrid_property
    def serialized(self):
        return {'position': self.position,
                'turn_number': self.turn_number,
                'game_id': self.game_id,
                'player_id': self.player_id}
