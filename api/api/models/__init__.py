from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


class Model:
    @classmethod
    def create(cls, data):
        instance = cls(**data)
        db.session.add(instance)
        db.session.commit()
        return instance
