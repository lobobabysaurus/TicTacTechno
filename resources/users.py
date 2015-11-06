from flask import Blueprint
from flask import json
from flask import request

from models import session
from models.user import User

users_api = Blueprint('users_api', __name__)


@users_api.route('/', methods=['GET'])
def get_all_users():
    users = session.query(User).all()
    return json.dumps(len(users))


@users_api.route('/', methods=['POST'])
def create_game():
    data = json.loads(
                    request.data.decode('utf-8').
                    replace("'", '"'))
    user = User(user_name=data['user_name'])
    session.add(user)
    session.commit()
    return json.dumps(user.id)


@users_api.route('/<user_id>')
def get_user_data(user_id):
    return user_id
