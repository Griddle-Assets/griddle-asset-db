from typing import Annotated, Literal, Sequence
from uuid import UUID
from fastapi import APIRouter, Body, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from util.crud import create_asset, create_version, read_assets, read_asset_info
from database.connection import get_db
from schemas.models import Asset, AssetCreate, Version
from util.files import save_upload_file_temp

router = APIRouter(
    prefix="/assets",
    tags=["assets"],
    responses={404: {"description": "Not found"}},
)

# TODO: kill this test stuff

test_uuid = UUID("5aafd32f-b977-4c04-b816-5780576eace0")
test_asset = Asset(
    asset_name="testAsset",
    author_pennkey="benfranklin",
    id=test_uuid,
    image_url="http://placekitten.com/400/400",
    keywords="kitchen;utensil",
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
def get_assets(
    search: str | None = None,
    keywords: str | None = None,
    sort: Literal["date", "name"] = "date",
    offset: int = 0,
    db: Session = Depends(get_db),
) -> Sequence[Asset]:
    # TODO: add filters and fuzzy search!
    return read_assets(db, search=(search if search != "" else None), offset=offset)


@router.post(
    "/",
    summary="Create a new asset, not including initial version",
    description="Creating a new asset in the database. Does not include initial version -- followed up with POST to `/assets/{uuid}` to upload an initial version.",
)
def new_asset(asset: AssetCreate, db: Session = Depends(get_db)) -> Asset:
    return create_asset(db, asset, "benfranklin")


# TODO: add relatedAssets
@router.get(
    "/{uuid}",
    summary="Get info about a specific asset",
    description="Based on `uuid`, fetches information on a specific asset.",
)
async def get_asset_info(uuid: str, db: Session = Depends(get_db)) -> Asset:
    result = read_asset_info(db, uuid)
    if result is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    return result


@router.put("/{uuid}", summary="Update asset metadata")
async def put_asset(
    uuid: str,
    asset: AssetCreate,
    db: Session = Depends(get_db),
):
    # TODO
    if uuid != test_uuid:
        raise HTTPException(status_code=404, detail="Asset not found")
    pass


@router.get("/{uuid}/versions", summary="Get a list of versions for a given asset")
async def get_asset_versions(
    uuid: str,
    sort: Literal["asc", "desc"] = "desc",
    offset: int = 0,
    db: Session = Depends(get_db),
) -> Sequence[Version]:
    # TODO
    if uuid != test_uuid:
        raise HTTPException(status_code=404, detail="Asset not found")
    return [test_version]


@router.get("/{uuid}/versions/{semver}", summary="Get a specific version of an asset")
async def get_version(
    uuid: str,
    semver: str,
    db: Session = Depends(get_db),
) -> Version:
    # TODO
    if uuid != test_uuid or semver != test_version.semver:
        raise HTTPException(status_code=404, detail="Version not found")
    return test_version


@router.post("/{uuid}/versions", summary="Upload a new version for a given asset")
async def new_asset_version(
    uuid: str,
    file: Annotated[UploadFile, File()],
    is_major: Annotated[bool, Form()] = False,
    db: Session = Depends(get_db),
):
    file_path = save_upload_file_temp(file)
    if file_path is None:
        raise HTTPException(status_code=400, detail="File uploaded incorrectly")
    return create_version(db, uuid, file_path, is_major, "benfranklin")


# TODO: get_asset_file
