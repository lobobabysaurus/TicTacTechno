from flask import Flask
from flask.ext.cors import CORS

from api.endpoints.game import GamesView
from api.endpoints.turn import TurnsView
from api.endpoints.user import UsersView
from api.models import bcrypt
from api.models import db


def create_app(config_class):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    bcrypt.init_app(app)
    CORS(app, origins=app.config.get('ALLOWED_HOSTS', '*'))

    api_views = [GamesView, TurnsView, UsersView]
    for view in api_views:
        view.register(app, route_prefix='/api/')

    return app
