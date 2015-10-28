from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models.sqlalchemy_test import User, Game, Base

engine = create_engine("mysql://root:NewAppearances@localhost/TicTacToe")

Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)

session = DBSession()

x_user = User(user_name='x_user')
session.add(x_user)
o_user = User(user_name='o_user')
session.add(o_user)
session.commit()

game = Game(x_user_id=x_user.id, o_user_id=o_user.id)
session.add(game)
session.commit()
