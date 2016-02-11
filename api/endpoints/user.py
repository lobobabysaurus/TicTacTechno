from json import dumps

from flask import request
from flask.ext.classy import FlaskView

from api.models import db
from api.models.user import User


class UserView(FlaskView):

    def index(self):
        return dumps([user.serialized for user in User.query.all()])

    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return dumps(user.serialized)

    def post(self):
        data = request.get_json()
        user = User(name=data['name'])
        db.session.add(user)
        db.session.commit()
        return dumps(user.serialized)
