from json import dumps

from flask import request
from flask.ext.classy import FlaskView

from api.endpoints.utils import process_raw_data
from api.models import db
from api.models.user import User


class UserView(FlaskView):

    def index(self):
        return dumps([user.serialized for user in User.query.all()])

    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            return dumps(user.serialized)
        else:
            return "Not Found", 404

    def post(self):
        data = process_raw_data(request.data)
        user = User(name=data['name'])
        db.session.add(user)
        db.session.commit()
        return dumps(user.serialized)
