import settings
from fastapi import FastAPI

from database import models
from database.connection import engine

from routers.assets import router as assets_router

models.Base.metadata.create_all(bind=engine)

# TODO: implement alembic to manage migrations

app = FastAPI()

app.include_router(assets_router, prefix="/api/v1")
