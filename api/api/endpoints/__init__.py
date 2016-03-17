from flask import Flask
from flask.ext.compress import Compress
from flask.ext.cors import CORS
from healthcheck import EnvironmentDump
from healthcheck import HealthCheck

from api.endpoints.game import GamesView
from api.endpoints.turn import TurnsView
from api.endpoints.user import UsersView
from api.models import db
from api.services import bcrypt
from api.services import mail


compress = Compress()
cors = CORS()
health = HealthCheck()
environment = EnvironmentDump()


def create_app(config_class):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    bcrypt.init_app(app)
    compress.init_app(app)
    cors.init_app(app, origins=app.config.get('ALLOWED_HOSTS', '*'))
    environment.init_app(app, "/environment")
    health.init_app(app, "/healthcheck")
    mail.init_app(app)

    api_views = [GamesView, TurnsView, UsersView]
    for view in api_views:
        view.register(app, route_prefix='/api/')

    return app
