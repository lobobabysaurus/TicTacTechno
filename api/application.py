from api.endpoints import create_app

app = create_app('api.config.DevConfig')
application = app

if __name__ == '__main__':
    app.run()
