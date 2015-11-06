from flask import Blueprint
from flask import json
from flask import request

from models import session
from models.game import Game

games_api = Blueprint('games_api', __name__)


@games_api.route('/', methods=['GET'])
def get_all_games():
    print('test')
    games = session.query(Game).all()
    print('test3')
    return json.dumps(len(games))


@games_api.route('/', methods=['POST'])
def create_game():
    data = json.loads(
                    request.data.decode('utf-8').
                    replace("'", '"'))
    game = Game(x_user_id=data['x_player_id'],
                o_user_id=data['o_player_id'])
    session.add(game)
    print(data['x_player_id'])
    print(game)
    session.commit()
    print(game.id)
    return json.dumps(game.id)


@games_api.route('/<game_id>')
def get_game_data(game_id):
    return game_id
