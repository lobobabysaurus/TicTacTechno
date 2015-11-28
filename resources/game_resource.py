from flask import Blueprint
from flask import json
from flask import request

from models import session
from models.game import Game
from resources.utils import process_post_data

games_api = Blueprint('games_api', __name__)


@games_api.route('/', methods=['GET'])
def get_all_games():
    ###
    # Get serialized data about all games
    ###
    games = session.query(Game).all()
    game_array = [game.serialize() for game in games]
    return json.dumps(game_array)


@games_api.route('/', methods=['POST'])
def create_game():
    ###
    # Create a new game between supplied users
    ###
    data = process_post_data(request.data)
    game = Game(x_user_id=data['x_player_id'],
                o_user_id=data['o_player_id'])
    session.add(game)
    session.commit()
    return json.dumps(game.id)


@games_api.route('/<game_id>', methods=['GET'])
def get_game_data(game_id):
    ###
    # Gets serialized data about a specific game
    #
    # @param game_id primary key for the game
    ###
    game = session.query(Game).get(game_id)
    return json.dumps(game.serialize())


@games_api.route('/claim_space/', methods=['POST'])
def claim_space():
    ###
    # Claims a space on the tic tac toe grid
    ###
    data = process_post_data(request.data)
    return data
