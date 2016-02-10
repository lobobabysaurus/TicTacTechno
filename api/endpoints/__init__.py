from flask import Flask

from api.endpoints.game import games_api
from api.endpoints.user import users_api
from api.models import db


def create_app(config_class):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    app.register_blueprint(games_api, url_prefix='/games')
    app.register_blueprint(users_api, url_prefix='/users')
    return app
