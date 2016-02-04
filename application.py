from api.endpoints import app
from api.models import Base
from api.models import engine


Base.metadata.create_all(engine)

app.Debug = True
app.run()
