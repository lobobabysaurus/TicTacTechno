from datetime import datetime

from sqlalchemy.ext.hybrid import hybrid_property

from api.models import db


class Game(db.Model):
    __tablename__ = 'games'
    id = db.Column(db.Integer, primary_key=True)

    start = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end = db.Column(db.DateTime)
    finished = db.Column(db.Boolean, default=False)

    x_player_id = db.Column(
                        db.Integer, db.ForeignKey('users.id'), nullable=False)
    x_player = db.relationship(
                        "User", foreign_keys=[x_player_id], backref='x_games')

    o_player_id = db.Column(
                        db.Integer, db.ForeignKey('users.id'), nullable=False)
    o_player = db.relationship(
                        "User", foreign_keys=[o_player_id], backref='o_games')

    winner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    winner = db.relationship(
                        "User", foreign_keys=[winner_id], backref='won_games')

    @hybrid_property
    def serialized(self):
        return {'id': self.id,
                'x_player_id': self.x_player_id,
                'o_player_id': self.o_player_id,
                'start': str(self.start),
                'end': str(self.end),
                'finished': self.finished,
                'winner_id': self.winner_id}
