from flask.ext.testing import TestCase

from api.endpoints import create_app
from api.models import db


class TestBase(TestCase):

    def create_app(config_filename):
        return create_app('api.config.TestConfig')

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
