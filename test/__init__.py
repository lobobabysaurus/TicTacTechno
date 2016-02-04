from unittest import TestCase

from api.endpoints import app
from api.models import Base
from api.models import session


class TestBase(TestCase):

    @classmethod
    def setUpClass(cls):
        cls.test_client = app.test_client()

    def setUp(self):
        Base.metadata.drop_all()
        Base.metadata.create_all()

    def tearDown(self):
        session.commit()
