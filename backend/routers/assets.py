from typing import Annotated
from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session

from util.crud import create_asset
from database.connection import get_db
from schemas.models import AssetCreate

router = APIRouter(
    prefix="/assets",
    # TODO: add tags
    # responses={404: {"description": "Not found"}},
)


@router.post("/")
async def new_asset(
    asset: Annotated[AssetCreate, Body(embed=True)], db: Session = Depends(get_db)
) -> str:
    create_asset(db, asset)
