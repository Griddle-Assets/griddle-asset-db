# NOTE: we gotta keep this as first import so other files can use `os.getenv`
from settings import is_dev

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import models
from database.connection import engine

from routers.sqladmin import config_sqladmin
from routers.api_v1 import router as api_v1_router

models.Base.metadata.create_all(bind=engine)

# TODO: implement alembic to manage migrations

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if is_dev:
    config_sqladmin(app)

app.include_router(api_v1_router)
