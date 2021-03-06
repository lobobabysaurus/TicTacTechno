from flask.ext.testing import TestCase

from api.endpoints import create_app
from api.models import db
from api.models.game import Game
from api.models.user import User


class TestBase(TestCase):

    def create_app(config_filename):
        return create_app('api.config.TestConfig')

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def new_game(self, **kwargs):
        default = {}
        default.update(kwargs)

        game = Game(**default)
        db.session.add(game)
        db.session.commit()
        return game

    def new_user(self, **kwargs):
        default = {
            'username': 'testinga',
            'password': 'testtestte',
            'email': 'test@test.com'
        }
        default.update(kwargs)

        user = User(**default)
        db.session.add(user)
        db.session.commit()
        return user
