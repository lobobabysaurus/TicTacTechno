import json

from flask import request
from flask.ext.classy import FlaskView
from flask.ext.classy import route
from jsonschema import Draft4Validator

from api.endpoints.validators import email
from api.endpoints.validators import handle_validation_errors
from api.endpoints.validators import password
from api.endpoints.validators import string
from api.endpoints.validators import username
from api.models.user import User
from api.services import bcrypt
from api.services import mail


user_validator = Draft4Validator({
    "type": "object",
    "properties": {
        "username": username,
        "password": password,
        "confirmPassword": string,
        "email":    email,
        "confirmEmail": string
    },
    "required": ["username", "password", "email"]
})


class UsersView(FlaskView):

    def index(self):
        return json.dumps([user.serialized for user in User.query.all()])

    def get(self, user_id):
        return json.dumps(User.query.get_or_404(user_id).serialized)

    def post(self):
        deserialized = request.get_json().copy()

        errors = {}
        if not user_validator.is_valid(deserialized):
            errors.update(handle_validation_errors(
                        user_validator.iter_errors(deserialized)))

        if deserialized.get('password', None) != \
           deserialized.get("confirmPassword", None):
            errors['confirmPassword'] = "Must match password"
        if deserialized.get('email', None) != \
           deserialized.get("confirmEmail", None):
            errors['confirmEmail'] = "Must match email"

        if User.exists_by_username(deserialized.get('username', '')):
            errors['username'] = 'Username is already registered'
        if User.exists_by_email(deserialized.get('email', '')):
            errors['email'] = 'Email is already registered'

        if errors != {}:
            return json.dumps(errors), 400

        deserialized['password'] = bcrypt.generate_password_hash(
            deserialized['password'])

        del deserialized['confirmPassword']
        del deserialized['confirmEmail']
        user = User.create(deserialized)

        mail.send_message(subject="Thanks For Registering!",
                          recipients=[deserialized['email']],
                          body="Thank you for registering for TicTacTechno")

        return json.dumps(user.serialized)

    def activate(self, user_id):
        user = User.query.get_or_404(user_id)
        user.is_active = True
        User.update(user)
        return json.dumps('User has been activated')
