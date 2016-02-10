from api.endpoints import create_app

app = create_app('api.config.DevConfig')
app.run()
