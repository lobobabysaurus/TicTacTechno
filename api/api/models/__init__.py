from flask.ext.sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Model:
    @classmethod
    def create(cls, data):
        instance = cls(**data)
        db.session.add(instance)
        db.session.commit()
        return instance
