import json

from schema import SchemaError
from api.models.user import User
from test import TestBase


class TestUserEndpoints(TestBase):

    def setUp(self):
        super().setUp()

    def test_list_users(self):
        self.new_user(username='O player', email='o@email.com')
        self.new_user(username='X player', email='x@email.com')

        users = self.client.get('/user/', content_type='application/json').json
        self.assertEquals(2, len(users))

    def test_create_user(self):
        self.assertEquals(0, User.query.count())
        self.client.post('/user/', content_type='application/json',
                         data=json.dumps({'username': 'create user',
                                          'email': 'create@email.com',
                                          'password': 'test'}))
        self.assertEquals(1, User.query.count())

        user = User.query.first()
        self.assertEquals('create user', user.username)

    def test_create_user_fails_invalid_email(self):
        self.assertEquals(0, User.query.count())

        with self.assertRaises(SchemaError):
            payload = json.dumps({'username': 'create user',
                                  'email': 'create',
                                  'password': 'test'})
            self.client.post('/user/', content_type='application/json',
                             data=payload)

        self.assertEquals(0, User.query.count())

    def test_get_user(self):
        user = self.new_user(username='X player', email='x@email.com')

        payload = self.client.get('/user/' + str(user.id),
                                  content_type='application/json').json
        self.assertEquals('X player', payload['name'])
