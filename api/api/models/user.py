from sqlalchemy.ext.hybrid import hybrid_property

from api.models import db
from api.models import Model


class User(db.Model, Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)

    wins = db.Column(db.Integer, default=0)
    losses = db.Column(db.Integer, default=0)
    ties = db.Column(db.Integer, default=0)
    unfinished = db.Column(db.Integer, default=0)

    is_active = db.Column(db.Boolean(), nullable=False, default=False)
    is_anonymous = db.Column(db.Boolean(), nullable=False, default=False)
    is_authenticated = db.Column(db.Boolean(), nullable=False, default=False)

    @hybrid_property
    def game_count(self):
        return self.wins + self.losses + self.ties + self.unfinished

    @hybrid_property
    def serialized(self):
        return {'id': self.id,
                'username': self.username,
                'email': self.email,
                'wins': self.wins,
                'losses': self.losses,
                'ties': self.ties,
                'unfinished': self.unfinished,
                'games': self.game_count}

    @classmethod
    def exists_by_id(cls, id):
        return cls.query.filter(cls.id == id).count() > 0

    @classmethod
    def exists_by_username(cls, username):
        return cls.query.filter(cls.username == username).count() > 0

    @classmethod
    def exists_by_email(cls, email):
        return cls.query.filter(cls.email == email).count() > 0

    def get_id(self):
        return self.id
