from typing import Annotated, List, Literal
from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session

from util.crud import create_asset
from database.connection import get_db
from schemas.models import Asset, AssetCreate, Version, VersionCreate

router = APIRouter(
    prefix="/assets",
    tags=["assets"],
    # responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_assets(
    search: str | None = None,
    keywords: str | None = None,
    sort: Literal["date", "name"] = "date",
    offset: int = 0,
    db: Session = Depends(get_db),
) -> List[Asset]:
    return [
        Asset(
            asset_name="testAsset",
            author_pennkey="benfranklin",
            id="5aafd32f-b977-4c04-b816-5780576eace0",
            image_url="http://placekitten.com/400/400",
        )
    ]


@router.post("/")
async def new_asset(
    asset: Annotated[AssetCreate, Body(embed=True)], db: Session = Depends(get_db)
):
    create_asset(db, asset)


# TODO: add relatedAssets
@router.get("/{uuid}")
async def new_asset(uuid: str, db: Session = Depends(get_db)) -> Asset:
    return Asset(
        asset_name="testAsset",
        author_pennkey="benfranklin",
        id=uuid,
        image_url="http://placekitten.com/400/400",
    )


@router.put("/{uuid}")
async def put_asset(uuid: str, db: Session = Depends(get_db)):
    pass


@router.get("/{uuid}/versions")
async def get_asset_versions(
    uuid: str,
    sort: Literal["asc", "desc"] = "desc",
    offset: int = 0,
    db: Session = Depends(get_db),
) -> Version:
    return [
        Version(
            author_pennkey="benfranklin",
            asset=Asset(
                asset_name="testAsset",
                author_pennkey="benfranklin",
                id=uuid,
                image_url="http://placekitten.com/400/400",
            ),
            asset_id=uuid,
            semver="0.1",
            file_key="123456",
        )
    ]


@router.post("/{uuid}/versions")
async def new_asset_version(
    uuid: str,
    version: VersionCreate,
    db: Session = Depends(get_db),
):
    pass
