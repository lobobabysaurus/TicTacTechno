from datetime import datetime

from api.models import db


class Game(db.Model):
    ###
    # A game of Tic Tac Toe
    ###
    __tablename__ = 'games'
    id = db.Column(db.Integer, primary_key=True)

    x_player_id = db.Column(
                        db.Integer, db.ForeignKey('users.id'), nullable=False)
    x_player = db.relationship(
                        "User", foreign_keys=[x_player_id], backref='x_games')
    o_player_id = db.Column(
                        db.Integer, db.ForeignKey('users.id'), nullable=False)
    o_player = db.relationship(
                        "User", foreign_keys=[o_player_id], backref='o_games')

    start = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end = db.Column(db.DateTime)
    finished = db.Column(db.Boolean, default=False)

    turn = db.Column(db.Integer, default=1)
    north_west = db.Column(db.String(1), default='')
    north = db.Column(db.String(1), default='')
    north_east = db.Column(db.String(1), default='')
    west = db.Column(db.String(1), default='')
    center = db.Column(db.String(1), default='')
    east = db.Column(db.String(1), default='')
    south_west = db.Column(db.String(1), default='')
    south = db.Column(db.String(1), default='')
    south_east = db.Column(db.String(1), default='')
