from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

engine = create_engine("mysql://root:TicTacToe@localhost/TicTacToe")
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()
