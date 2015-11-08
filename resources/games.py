from flask import Blueprint
from flask import json
from flask import request

from models import session
from models.game import Game

games_api = Blueprint('games_api', __name__)


@games_api.route('/', methods=['GET'])
def get_all_games():
    games = session.query(Game).all()
    game_array = [game.serialize() for game in games]
    return json.dumps(game_array)


@games_api.route('/', methods=['POST'])
def create_game():
    data = json.loads(request.data.decode('utf-8'))
    game = Game(x_user_id=data['x_player_id'],
                o_user_id=data['o_player_id'])
    session.add(game)
    session.commit()
    return json.dumps(game.id)


@games_api.route('/<game_id>')
def get_game_data(game_id):
    return game_id
