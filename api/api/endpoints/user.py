from json import dumps

from flask import request
from flask.ext.classy import FlaskView
from schema import And
from schema import Schema

from api.endpoints.validators import email
from api.models import bcrypt
from api.models import db
from api.models.user import User


user_schema = Schema({"username": And(str, len),
                      "password": And(str, len),
                      "email": And(str, len, email)})


class UsersView(FlaskView):

    def index(self):
        return dumps([user.serialized for user in User.query.all()])

    def get(self, user_id):
        return dumps(User.query.get_or_404(user_id).serialized)

    def post(self):
        deserialized = user_schema.validate(request.get_json())

        deserialized['password'] = bcrypt.generate_password_hash(
            deserialized['password'])

        user = User(**deserialized)
        db.session.add(user)
        db.session.commit()

        return dumps(user.serialized)
