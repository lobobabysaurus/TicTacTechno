from api.endpoints import create_app

app = create_app('api.config.LocalConfig')
application = app

if __name__ == '__main__':
    app.run()
