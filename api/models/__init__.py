from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


def serialize(self):
    ###
    # Put all data about a model into a dictionary
    #
    # :return Dictionary with all model fields
    ###
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}

Base.serialize = serialize

engine = create_engine("mysql://root:TicTacToe@localhost/TicTacToe")
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()
