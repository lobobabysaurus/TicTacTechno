from flask import Blueprint
from flask import json
from flask import request

from api.endpoints.utils import process_raw_data
from api.models import db
from api.models.game import Game


games_api = Blueprint('games_api', __name__)


@games_api.route('/', methods=['GET'])
def get_all_games():
    ###
    # Get serialized data about all games
    ###
    games = Game.query.all()
    game_array = [game.id for game in games]
    return json.dumps(game_array)


@games_api.route('/', methods=['POST'])
def create_game():
    ###
    # Create a new game between supplied users
    ###
    data = process_raw_data(request.data)
    game = Game(x_player_id=data['x_player_id'],
                o_player_id=data['o_player_id'])
    db.session.add(game)
    db.session.commit()
    return json.dumps(game.id)


@games_api.route('/<game_id>', methods=['GET'])
def get_game_data(game_id):
    ###
    # Gets serialized data about a specific game
    #
    # @param game_id primary key for the game
    ###
    game = Game.query.get(game_id)
    return json.dumps(game.id)


@games_api.route('/claim_space/', methods=['POST'])
def claim_space():
    ###
    # Claims a space on the tic tac toe grid
    ###
    data = process_raw_data(request.data)
    return data
