from models import Base
from models import engine
from resources import app

Base.metadata.create_all(engine)

app.Debug = True
app.run()
