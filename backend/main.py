from settings import is_dev

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import models
from database.connection import engine

from routers.assets import router as assets_router

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

app.include_router(assets_router, prefix="/api/v1")
