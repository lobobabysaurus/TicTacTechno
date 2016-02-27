from json import dumps

from flask import request
from flask.ext.classy import FlaskView
from schema import Schema

from api.models import db
from api.models.game import Game


game_schema = Schema({'x_player_id': int,
                      'o_player_id': int})


class GamesView(FlaskView):

    def index(self):
        return dumps([game.serialized for game in Game.query.all()])

    def get(self, game_id):
        return dumps(Game.query.get_or_404(game_id).serialized)

    def post(self):
        deserialized = game_schema.validate(request.get_json())

        game = Game(**deserialized)
        db.session.add(game)
        db.session.commit()

        return dumps(game.serialized)
