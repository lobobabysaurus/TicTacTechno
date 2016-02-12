import json

from api.models import db
from api.models.user import User
from test import TestBase


class TestUserEndpoints(TestBase):

    def setUp(self):
        super().setUp()

    def test_list_users(self):
        o_player = User(user_name='O player', email='o@email.com')
        x_player = User(user_name='X player', email='x@email.com')
        db.session.add_all([o_player, x_player])
        db.session.commit()

        users = self.client.get('/user/', content_type='application/json').json
        self.assertEquals(2, len(users))

    def test_create_user(self):
        self.assertEquals(0, User.query.count())
        self.client.post('/user/', content_type='application/json',
                         data=json.dumps({'user_name': 'create user',
                                          'email': 'create@email.com'}))
        self.assertEquals(1, User.query.count())

        user = User.query.first()
        self.assertEquals('create user', user.user_name)

    def test_get_user(self):
        user = User(user_name='X player', email='x@email.com')
        db.session.add(user)
        db.session.commit()

        payload = self.client.get('/user/' + str(user.id),
                                  content_type='application/json').json
        self.assertEquals('X player', payload['name'])
