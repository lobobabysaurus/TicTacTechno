class InternalConfig(object):
    DEBUG = True
    APPLICATION_ROOT = "/api/"


class DevConfig(InternalConfig):
    SQLALCHEMY_DATABASE_URI = "mysql://root:TicTacToe@localhost/TicTacToe"
    ALLOWED_HOSTS = ['http://127.0.0.1:8080']


class TestConfig(InternalConfig):
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    TESTING = True
