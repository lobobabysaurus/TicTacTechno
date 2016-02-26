class InternalConfig(object):
    DEBUG = True


class DevConfig(InternalConfig):
    SQLALCHEMY_DATABASE_URI = "mysql://root:TicTacToe@localhost/TicTacToe"


class TestConfig(InternalConfig):
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    TESTING = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
