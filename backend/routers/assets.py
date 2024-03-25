from typing import Annotated, List, Literal
from fastapi import APIRouter, Body, Depends, HTTPException, UploadFile
from sqlalchemy.orm import Session

from util.crud import create_asset
from database.connection import get_db
from schemas.models import Asset, AssetCreate, Version, VersionCreate

router = APIRouter(
    prefix="/assets",
    tags=["assets"],
    responses={404: {"description": "Not found"}},
)

# TODO: kill this test stuff

test_uuid = "5aafd32f-b977-4c04-b816-5780576eace0"
test_asset = Asset(
    asset_name="testAsset",
    author_pennkey="benfranklin",
    id=test_uuid,
    image_url="http://placekitten.com/400/400",
    keywords="",
)
test_version = Version(
    author_pennkey="benfranklin",
    asset_id=test_uuid,
    semver="0.1",
    file_key="123456",
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
    return [test_asset]


@router.post(
    "/",
    summary="Create a new asset, not including initial version",
    description="Creating a new asset in the database. Does not include initial version -- followed up with POST to `/assets/{uuid}` to upload an initial version.",
)
async def new_asset(
    asset: Annotated[AssetCreate, Body(embed=True)], db: Session = Depends(get_db)
):
    create_asset(db, asset, "benfranklin")


# TODO: add relatedAssets
@router.get(
    "/{uuid}",
    summary="Get info about a specific asset",
    description="Based on `uuid`, fetches information on a specific asset.",
)
async def get_asset_info(uuid: str, db: Session = Depends(get_db)) -> Asset:
    if uuid != test_uuid:
        raise HTTPException(status_code=404, detail="Asset not found")
    return test_asset


@router.put("/{uuid}", summary="Update asset metadata")
async def put_asset(
    uuid: str,
    asset: Annotated[AssetCreate, Body(embed=True)],
    db: Session = Depends(get_db),
):
    if uuid != test_uuid:
        raise HTTPException(status_code=404, detail="Asset not found")
    pass


@router.get("/{uuid}/versions", summary="Get a list of versions for a given asset")
async def get_asset_versions(
    uuid: str,
    sort: Literal["asc", "desc"] = "desc",
    offset: int = 0,
    db: Session = Depends(get_db),
) -> List[Version]:
    if uuid != test_uuid:
        raise HTTPException(status_code=404, detail="Asset not found")
    return [test_version]


@router.post("/{uuid}/versions", summary="Upload a new version for a given asset")
async def new_asset_version(
    uuid: str,
    version: VersionCreate,
    file: UploadFile,
    db: Session = Depends(get_db),
):
    if uuid != test_uuid:
        raise HTTPException(status_code=404, detail="Asset not found")
    print(str(file))
