from io import TextIOWrapper
from pathlib import Path
import semver
from sqlalchemy import select
from sqlalchemy.orm import Session
from uuid import uuid4

from schemas.models import AssetCreate, VersionCreate
from database.models import Asset, Version

from util.s3 import assets_bucket

# https://fastapi.tiangolo.com/tutorial/sql-databases/#crud-utils


def get_asset(db: Session, asset_id: str):
    return db.query(Asset).filter(Asset.id == asset_id).first()


# TODO: get_assets


def create_asset(db: Session, asset: AssetCreate, author_pennkey: str):
    db_asset = Asset(
        id=uuid4(),
        asset_name=asset.asset_name,
        author_pennkey=author_pennkey,
        keywords=asset.keywords,
        image_url=asset.image_url,
    )
    db.add(db_asset)
    db.commit()
    db.refresh(db_asset)
    return db_asset


# TODO: get_asset_versions

# TODO: get_version


def create_version(
    db: Session,
    asset_id: str,
    filePath: Path,
    is_major: bool,
    author_pennkey: str,
):
    file_key = f"{uuid4()}"
    assets_bucket.upload_file(str(filePath.resolve()), file_key)

    # check for existing version to bump semver
    existing_version = (
        db.execute(
            select(Version)
            .filter(Version.asset_id == asset_id)
            .order_by(Version.semver.desc())
            .limit(1)
        )
        .scalars()
        .first()
    )

    # if no existing version, use 0.1
    if existing_version is None:
        new_semver = "0.1"
    else:
        ver = semver.Version.parse(f"{existing_version.semver}.0")
        new_semver = str(ver.next_version("major" if is_major else "minor"))[:-2]

    db_version = Version(
        asset_id=asset_id,
        semver=new_semver,
        author_pennkey=author_pennkey,
        file_key=file_key,
    )
    db.add(db_version)
    db.commit()
    db.refresh(db_version)
    return db_version
