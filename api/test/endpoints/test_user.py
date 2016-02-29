from json import dumps

from api.models.user import User
from test import TestBase


class TestUserEndpoints(TestBase):

    def setUp(self):
        super().setUp()
        self.base_payload = {
            'username': 'create user',
            'password': 'testtestte',
            'confirmPassword': 'testtestte',
            'email': 'create@email.com',
            'confirmEmail': 'create@email.com'}

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
        payload = dumps(self.base_payload)
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
        self.assertEquals({'username': "Username cannot be empty",
                           'password': "Password cannot be empty",
                           'email': "Email cannot be empty"},
                          resp.json)

    def test_create_user_fails_empty_fields(self):
        self.assertEquals(0, User.query.count())
        payload = dumps({'username': '',
                         'email': '',
                         'confirmEmail': '',
                         'password': '',
                         'confirmPassword': ''})
        resp = self.client.post('/api/users/', content_type='application/json',
                                data=payload)
        self.assertEquals(400, resp.status_code)

        self.assertEquals(0, User.query.count())
        print(resp.json)
        self.assertEquals({'username': "Username cannot be empty",
                           'password': "Password cannot be empty",
                           'email': "Email cannot be empty"},
                          resp.json)

    def test_create_user_fails_too_short_username(self):
        self.assertEquals(0, User.query.count())

        payload = dumps({'username': 'short',
                         'email': 'test@test.com',
                         'confirmEmail': 'test@test.com',
                         'password': 'testtestte',
                         'confirmPassword': 'testtestte'})
        resp = self.client.post('/api/users/', content_type='application/json',
                                data=payload)
        self.assertEquals(400, resp.status_code)

        self.assertEquals(0, User.query.count())
        self.assertEquals(
            {'username': 'Username should have a length of at least 8'},
            resp.json)

    def test_create_user_fails_existing_username(self):
        self.assertEquals(0, User.query.count())

        self.new_user(username='create user')
        self.assertEquals(1, User.query.count())

        payload = dumps({'username': 'create user',
                         'email': 'duplicate@test.com',
                         'confirmEmail': 'duplicate@test.com',
                         'password': 'testtestte',
                         'confirmPassword': 'testtestte'})
        resp = self.client.post('/api/users/', content_type='application/json',
                                data=payload)
        self.assertEquals(400, resp.status_code)

        self.assertEquals(1, User.query.count())
        self.assertEquals({'username': 'Username is already registered'},
                          resp.json)

    def test_create_user_fails_too_short_password(self):
        self.assertEquals(0, User.query.count())

        payload = dumps({'username': 'regularuser',
                         'email': 'test@test.com',
                         'confirmEmail': 'test@test.com',
                         'password': 'testtest',
                         'confirmPassword': 'testtest'})
        resp = self.client.post('/api/users/', content_type='application/json',
                                data=payload)
        self.assertEquals(400, resp.status_code)

        self.assertEquals(0, User.query.count())
        self.assertEquals(
            {'password': 'Password should have a length of at least 10'},
            resp.json)

    def test_create_user_fails_invalid_email(self):
        self.assertEquals(0, User.query.count())

        payload = dumps({'username': 'create user',
                         'email': 'create',
                         'confirmEmail': 'create',
                         'password': 'testtestte',
                         'confirmPassword': 'testtestte'})
        resp = self.client.post('/api/users/', content_type='application/json',
                                data=payload)
        self.assertEquals(400, resp.status_code)

        self.assertEquals(0, User.query.count())
        self.assertEquals({'email': 'create is not a valid email'}, resp.json)

    def test_create_user_fails_existing_email(self):
        self.assertEquals(0, User.query.count())

        self.new_user(email='duplicate@test.com')
        self.assertEquals(1, User.query.count())

        payload = dumps({'username': 'create user2',
                         'email': 'duplicate@test.com',
                         'confirmEmail': 'duplicate@test.com',
                         'password': 'testtestte',
                         'confirmPassword': 'testtestte'})
        resp = self.client.post('/api/users/', content_type='application/json',
                                data=payload)
        self.assertEquals(400, resp.status_code)

        self.assertEquals(1, User.query.count())
        self.assertEquals({'email': 'Email is already registered'}, resp.json)
