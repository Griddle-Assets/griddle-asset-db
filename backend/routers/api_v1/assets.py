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
    image_uri="data:image/jpg;base64,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",
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
