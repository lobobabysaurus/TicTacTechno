from flask import Flask

from resources.games import games_api
from resources.users import users_api

app = Flask(__name__)

app.register_blueprint(games_api, url_prefix='/games')
app.register_blueprint(users_api, url_prefix='/users')
