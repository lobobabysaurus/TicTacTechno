from flask import Blueprint
from flask import json
from flask import request

from api.endpoints.utils import process_raw_data
from api.models import session
from api.models.user import User


users_api = Blueprint('users_api', __name__)


@users_api.route('/', methods=['GET'])
def get_all_users():
    ###
    # Get data about all users of the application
    ###
    users = session.query(User).all()
    user_array = [user.serialize() for user in users]
    return json.dumps(user_array)


@users_api.route('/', methods=['POST'])
def create_user():
    ###
    # Create a new game user
    ###
    data = process_raw_data(request.data.decode('utf-8'))
    user = User(user_name=data['user_name'])
    session.add(user)
    session.commit()
    return json.dumps(user.id)


@users_api.route('/<user_id>', methods=['GET'])
def get_user_data(user_id):
    ###
    # Get serialized data about a specific user
    #
    # :param user_id primary key of the user to grab
    ###
    user = session.query(User).get(user_id)
    return json.dumps(user.serialize())
