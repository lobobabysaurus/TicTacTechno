from json import dumps

from flask import request
from flask.ext.classy import FlaskView

from api.endpoints.utils import process_raw_data
from api.models import db
from api.models.game import Game


class GameView(FlaskView):

    def index(self):
        return dumps([game.serialized for game in Game.query.all()])

    def get(self, game_id):
        game = Game.query.get(game_id)
        if game:
            return dumps(game.serialized)
        else:
            return "Not Found", 404

    def post(self):
        data = process_raw_data(request.data)
        game = Game(x_player_id=data['x_player_id'],
                    o_player_id=data['o_player_id'])
        db.session.add(game)
        db.session.commit()
        return dumps(game.serialized)

    def put(self):
        data = process_raw_data(request.data)
        return data
