from flask import Flask
from flask.ext.cors import CORS

from api.endpoints.game import GameView
from api.endpoints.user import UserView
from api.models import bcrypt
from api.models import db


def create_app(config_class):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    if app.debug:
        CORS(app)
    bcrypt.init_app(app)

    GameView.register(app)
    UserView.register(app)

    return app
