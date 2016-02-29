from json import dumps

from api.models.game import Game
from test import TestBase


class TestGameEndpoints(TestBase):

    def setUp(self):
        super().setUp()

    def test_list_games(self):
        o_player = self.new_user(username='O player', email='o@email.com')
        x_player = self.new_user(username='X player', email='x@email.com')

        self.new_game(x_player_id=x_player.id, o_player_id=o_player.id)
        self.new_game(x_player_id=x_player.id, o_player_id=o_player.id)
        self.new_game(x_player_id=x_player.id, o_player_id=o_player.id)

        games = self.client.get('/api/games/',
                                content_type='application/json').json
        self.assertEquals(3, len(games))

    def test_get_game(self):
        o_player = self.new_user(username='O player', email='o@email.com')
        x_player = self.new_user(username='X player', email='x@email.com')

        new_game = self.new_game(x_player_id=x_player.id,
                                 o_player_id=o_player.id)

        payload = self.client.get('/api/games/{}'.format(new_game.id),
                                  content_type='application/json').json
        self.assertEquals(o_player.id, payload['o_player_id'])
        self.assertEquals(x_player.id, payload['x_player_id'])

    def test_create_game(self):
        o_player = self.new_user(username='O player', email='o@email.com')
        x_player = self.new_user(username='X player', email='x@email.com')
        payload = dumps({'x_player_id': x_player.id,
                         'o_player_id': o_player.id})

        self.assertEquals(0, Game.query.count())
        self.client.post('/api/games/', content_type='application/json',
                         data=payload)
        self.assertEquals(1, Game.query.count())

        game = Game.query.first()
        self.assertEquals(x_player, game.x_player)
        self.assertEquals(o_player, game.o_player)

    def test_create_game_fails_missing_fields(self):
        self.assertEquals(0, Game.query.count())
        resp = self.client.post('/api/games/', content_type='application/json',
                                data='{}')
        self.assertEquals(400, resp.status_code)
        self.assertEquals({
            'o_player_id': "O_player_id cannot be empty",
            'x_player_id': "X_player_id cannot be empty"},
            resp.json)

    def test_create_game_fails_nonexistent_users(self):
        self.assertEquals(0, Game.query.count())
        payload = dumps({
            "x_player_id": 45,
            "o_player_id": 46
        })
        resp = self.client.post('/api/games/', content_type='application/json',
                                data=payload)
        self.assertEquals(400, resp.status_code)
        self.assertEquals({
            'o_player_id': "Player does not exist",
            'x_player_id': "Player does not exist"},
            resp.json)
