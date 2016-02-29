from api.models.user import User
from test import TestBase


class TestUserModel(TestBase):

    def setUp(self):
        super().setUp()

    def test_user_exists_by_id(self):
        self.assertFalse(User.exists_by_id(505050))
        self.assertTrue(User.exists_by_id(self.new_user().id))

    def test_user_exists_by_username(self):
        self.assertFalse(User.exists_by_username('nonsense'))
        self.assertTrue(User.exists_by_username(self.new_user().username))

    def test_user_exists_by_email(self):
        self.assertFalse(User.exists_by_email('nonsense'))
        self.assertTrue(User.exists_by_email(self.new_user().email))
