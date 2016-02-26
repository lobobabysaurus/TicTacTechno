from sqlalchemy.ext.hybrid import hybrid_property

from api.models import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)

    wins = db.Column(db.Integer, default=0)
    losses = db.Column(db.Integer, default=0)
    ties = db.Column(db.Integer, default=0)
    unfinished = db.Column(db.Integer, default=0)

    @hybrid_property
    def games(self):
        return self.wins + self.losses + self.ties + self.unfinished

    @hybrid_property
    def serialized(self):
        return {'id': self.id,
                'name': self.username,
                'email': self.email,
                'password': self.password,
                'wins': self.wins,
                'losses': self.losses,
                'ties': self.ties,
                'unfinished': self.unfinished,
                'games': self.games}
