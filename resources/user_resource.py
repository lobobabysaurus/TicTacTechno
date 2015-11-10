from flask import Blueprint
from flask import json
from flask import request

from models import session
from models.user import User

users_api = Blueprint('users_api', __name__)


@users_api.route('/', methods=['GET'])
def get_all_users():
    users = session.query(User).all()
    user_array = [user.serialize() for user in users]
    return json.dumps(user_array)


@users_api.route('/', methods=['POST'])
def create_user():
    data = json.loads(request.data.decode('utf-8'))
    user = User(user_name=data['user_name'])
    session.add(user)
    session.commit()
    return json.dumps(user.id)


@users_api.route('/<user_id>', methods=['GET'])
def get_user_data(user_id):
    user = session.query(User).get(user_id)
    return json.dumps(user.serialize())
