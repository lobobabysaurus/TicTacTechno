from sqlalchemy.ext.hybrid import hybrid_property

from api.models import db


class User(db.Model):
    ###
    # A user of the system
    ###
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255))

    wins = db.Column(db.Integer, default=0)
    losses = db.Column(db.Integer, default=0)
    ties = db.Column(db.Integer, default=0)
    unfinished = db.Column(db.Integer, default=0)

    @hybrid_property
    def games(self):
        return self.wins + self.losses + self.ties + self.unfinished
