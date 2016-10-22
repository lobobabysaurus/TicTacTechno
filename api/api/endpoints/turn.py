from json import dumps

from flask import request
from flask.ext.classy import FlaskView
from jsonschema import Draft4Validator

from api.endpoints.validators import handle_validation_errors
from api.endpoints.validators import nonempty_string
from api.endpoints.validators import number
from api.models import db
from api.models.game import Game
from api.models.turn import Turn


turn_validator = Draft4Validator({'position': nonempty_string,
                                  'game_id': number,
                                  'player_id': number})


class TurnsView(FlaskView):

    def post(self):
        deserialized = request.get_json()

        if not turn_validator.is_valid(deserialized):
            errors = handle_validation_errors(
                        turn_validator.iter_errors(deserialized))
            return dumps(errors), 400

        position_occupied = Turn.query.filter(
                          Turn.position == deserialized['position'],
                          Turn.game_id == deserialized['game_id']).count() > 0
        if position_occupied:
            return "{} occupied".format(deserialized['position']), 400

        game = Game.query.get_or_404(deserialized['game_id'])
        deserialized['turn_number'] = len(game.game_turns) + 1

        turn = Turn(**deserialized)
        db.session.add(turn)
        db.session.commit()

        return dumps(turn.serialize)
