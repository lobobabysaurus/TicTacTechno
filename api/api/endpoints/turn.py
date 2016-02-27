from flask import request
from flask.ext.classy import FlaskView
from schema import And
from schema import Schema

from api.models import db
from api.models.game import Game
from api.models.turn import Turn

turn_schema = Schema({'position': str,
                      'turn_number': And(int, lambda n: 1 <= n <= 9),
                      'game_id': int,
                      'player_id': int})


class TurnsView(FlaskView):
    def post(self):
        deserialized = turn_schema.validate(request.get_json())

        game = Game.query.get_or_404(deserialized['game_id'])

        turns = game.game_turns
        if deserialized['turn_number'] != len(turns)+1:
            return 'Invalid Turn', 400

        position_occupied = Turn.query.filter(
                          Turn.position == deserialized['position'],
                          Turn.game_id == deserialized['game_id']).count() > 0
        if position_occupied:
            return 'Occupied Position', 400

        turn = Turn(**deserialized)
        db.session.add(turn)
        db.session.commit()

        return turn.serialize
