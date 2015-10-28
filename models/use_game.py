from models.sqlalchemy_test import Game, User, Base
from sqlalchemy import create_engine
engine = create_engine("mysql://root:NewAppearances@localhost/TicTacToe")
Base.metadata.bind = engine
from sqlalchemy.orm import sessionmaker
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()

users = session.query(User).all()
for user in users:
    print(user.x_games + user.o_games)

game = session.query(Game).all()
print(game[0])


