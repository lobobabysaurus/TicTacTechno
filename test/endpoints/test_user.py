import json

from api.endpoints.utils import process_raw_data
from api.models import db
from api.models.user import User
from test import TestBase


class TestUserEndpoints(TestBase):

    def setUp(self):
        super().setUp()

    def test_list_users(self):
        o_player = User(name='O player')
        x_player = User(name='X player')
        db.session.add_all([o_player, x_player])
        db.session.commit()

        self.assertEquals(2, len(self.client.get('/user/').json))

    def test_create_user(self):
        self.assertEquals(0, User.query.count())
        self.client.post('/user/', data=json.dumps({
            'name': 'create user'
        }))
        self.assertEquals(1, User.query.count())

        user = User.query.first()
        self.assertEquals('create user', user.name)

    def test_get_user(self):
        user = User(name='X player')
        db.session.add(user)
        db.session.commit()

        payload = self.client.get('/user/' + str(user.id)).json
        self.assertEquals('X player', payload['name'])
