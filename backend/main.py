from fastapi import FastAPI
from routers.assets import router as assets_router

app = FastAPI()


app.include_router(assets_router)
