from flask import Flask

from api.endpoints.game import games_api
from api.endpoints.user import users_api

app = Flask(__name__)

app.register_blueprint(games_api, url_prefix='/games')
app.register_blueprint(users_api, url_prefix='/users')
