from json import dumps

from flask import request
from flask.ext.classy import FlaskView
from jsonschema import Draft4Validator

from api.endpoints.validators import handle_validation_errors
from api.endpoints.validators import number
from api.models import db
from api.models.game import Game


game_validator = Draft4Validator({
    "type": "object",
    "properties": {
        "x_player_id": number,
        "o_player_id": number
    },
    "required": ["x_player_id", "o_player_id"]
})


class GamesView(FlaskView):

    def index(self):
        return dumps([game.serialized for game in Game.query.all()])

    def get(self, game_id):
        return dumps(Game.query.get_or_404(game_id).serialized)

    def post(self):
        deserialized = request.get_json()
        if not game_validator.is_valid(deserialized):
            errors = handle_validation_errors(
                        game_validator.iter_errors(deserialized))
            return dumps(errors), 400

        game = Game(**deserialized)
        db.session.add(game)
        db.session.commit()

        return dumps(game.serialized)
