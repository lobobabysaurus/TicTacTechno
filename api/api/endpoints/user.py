from json import dumps

from flask import request
from flask.ext.classy import FlaskView
from jsonschema import Draft4Validator

from api.endpoints.validators import email
from api.endpoints.validators import handle_validation_errors
from api.endpoints.validators import nonempty_string
from api.models import bcrypt
from api.models import db
from api.models.user import User


user_validator = Draft4Validator({
    "type": "object",
    "properties": {
        "username": nonempty_string,
        "password": nonempty_string,
        "email":    email
    },
    "required": ["username", "password", "email"]
})


class UsersView(FlaskView):

    def index(self):
        return dumps([user.serialized for user in User.query.all()])

    def get(self, user_id):
        return dumps(User.query.get_or_404(user_id).serialized)

    def post(self):
        deserialized = request.get_json()

        if not user_validator.is_valid(deserialized):
            errors = handle_validation_errors(
                        user_validator.iter_errors(deserialized))
            return dumps(errors), 400
        else:
            deserialized['password'] = bcrypt.generate_password_hash(
                deserialized['password'])

            user = User(**deserialized)
            db.session.add(user)
            db.session.commit()

            return dumps(user.serialized)
