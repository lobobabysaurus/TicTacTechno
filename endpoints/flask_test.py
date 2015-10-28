from flask import Flask
app = Flask(__name__)

@app.route('/')
def check():
    return "First flask http response!"

@app.route('/game/<game_id>')
def get_game_data(game_id):
    return game_id

@app.route('/user/<user_id>')
def get_user_data(user_id):
    return user_id

app.run()
