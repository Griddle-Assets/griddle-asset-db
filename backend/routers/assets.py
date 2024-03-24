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


@router.get(
    "/",
    summary="Get a list of assets",
    description="""Used for fetching a (paginated) list of assets stored in the database.

Allows searching by arbitrary strings, sorting by date or name, adding keyword filters, and adding offset for pagination.""",
)
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


@router.post(
    "/",
    summary="Create a new asset, not including initial version",
    description="Creating a new asset in the database. Does not include initial version -- followed up with POST to `/assets/{uuid}` to upload an initial version.",
)
async def new_asset(
    asset: Annotated[AssetCreate, Body(embed=True)], db: Session = Depends(get_db)
):
    create_asset(db, asset)


# TODO: add relatedAssets
@router.get(
    "/{uuid}",
    summary="Get info about a specific asset",
    description="Based on `uuid`, fetches information on a specific asset.",
)
async def new_asset(uuid: str, db: Session = Depends(get_db)) -> Asset:
    return Asset(
        asset_name="testAsset",
        author_pennkey="benfranklin",
        id=uuid,
        image_url="http://placekitten.com/400/400",
    )


@router.put("/{uuid}", summary="Update asset metadata")
async def put_asset(uuid: str, db: Session = Depends(get_db)):
    pass


@router.get("/{uuid}/versions", summary="Get a list of versions for a given asset")
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


@router.post("/{uuid}/versions", summary="Upload a new version for a given asset")
async def new_asset_version(
    uuid: str,
    version: VersionCreate,
    db: Session = Depends(get_db),
):
    pass
