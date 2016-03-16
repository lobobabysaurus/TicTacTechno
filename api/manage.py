from urllib.parse import unquote

from flask import url_for
from flask.ext.script import Manager, prompt_bool

from api.endpoints import create_app
from api.models import db

app = create_app('api.config.LocalConfig')
manager = Manager(app)


@manager.command
def list_routes():
    output = []
    for rule in app.url_map.iter_rules():
        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)

        methods = ','.join(rule.methods)
        url = url_for(rule.endpoint, **options)
        line = unquote("{:50s} {:20s} {}".format(rule.endpoint, methods, url))
        output.append(line)

    for line in sorted(output):
        print(line)


@manager.command
def refresh_db():
    if prompt_bool("Are you sure you want to lose all current data"):
        with app.app_context():
            print("Dropping Tables")
            db.drop_all()
            print("Creating Tables")
            db.create_all()
            print("Refresh Complete")

manager.run()
