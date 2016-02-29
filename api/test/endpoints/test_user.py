from json import dumps

from api.models.user import User
from test import TestBase


class TestUserEndpoints(TestBase):

    def setUp(self):
        super().setUp()

    def test_list_users(self):
        self.new_user(username='O player', email='o@email.com')
        self.new_user(username='X player', email='x@email.com')

        users = self.client.get('/api/users/',
                                content_type='application/json').json
        self.assertEquals(2, len(users))

    def test_get_user(self):
        user = self.new_user(username='X player', email='x@email.com')

        payload = self.client.get('/api/users/{}'.format(user.id),
                                  content_type='application/json').json
        self.assertEquals('X player', payload['username'])

    def test_create_user(self):
        self.assertEquals(0, User.query.count())
        payload = dumps({'username': 'create user',
                         'email': 'create@email.com',
                         'password': 'test'})
        self.client.post('/api/users/', content_type='application/json',
                         data=payload)
        self.assertEquals(1, User.query.count())

        user = User.query.first()
        self.assertEquals('create user', user.username)

    def test_create_user_fails_missing_fields(self):
        self.assertEquals(0, User.query.count())

        resp = self.client.post('/api/users/', content_type='application/json',
                                data='{}')
        self.assertEquals(400, resp.status_code)

        self.assertEquals(0, User.query.count())
        self.assertEquals({'username': "'username' is a required property",
                           'password': "'password' is a required property",
                           'email': "'email' is a required property"},
                          resp.json)

    def test_create_user_fails_empty_fields(self):
        self.assertEquals(0, User.query.count())
        payload = dumps({'username': '',
                         'email': '',
                         'password': ''})
        resp = self.client.post('/api/users/', content_type='application/json',
                                data=payload)
        self.assertEquals(400, resp.status_code)

        self.assertEquals(0, User.query.count())
        print(resp.json)
        self.assertEquals({'username': "username cannot be empty",
                           'password': "password cannot be empty",
                           'email': "email cannot be empty"},
                          resp.json)

    def test_create_user_fails_invalid_email(self):
        self.assertEquals(0, User.query.count())

        payload = dumps({'username': 'create user',
                         'email': 'create',
                         'password': 'test'})
        resp = self.client.post('/api/users/', content_type='application/json',
                                data=payload)
        self.assertEquals(400, resp.status_code)

        self.assertEquals(0, User.query.count())
        self.assertEquals({'email': 'create is not a valid email'}, resp.json)
