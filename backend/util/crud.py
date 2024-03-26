from sqlalchemy import select
from sqlalchemy.orm import Session

from schemas.models import AssetCreate
from database.models import Asset, Version

# https://fastapi.tiangolo.com/tutorial/sql-databases/#crud-utils


def read_asset(db: Session, asset_id: str):
    return db.query(Asset).filter(Asset.id == asset_id).first()


def read_assets(db: Session, search: str | None = None, offset=0):
    query = select(Asset)
    if search != None:
        query = query.filter(Asset.asset_name.ilike("%{}%".format(search)))
    query = query.limit(24).offset(offset)
    print(str(query))
    return db.execute(query).scalars().all()


def create_asset(db: Session, asset: AssetCreate, author_pennkey: str):
    db_asset = Asset(
        asset_name=asset.asset_name,
        author_pennkey=author_pennkey,
        keywords=asset.keywords,
        image_url=asset.image_url,
    )
    db.add(db_asset)
    db.commit()
    db.refresh(db_asset)
    return db_asset

def read_asset_info(db: Session, asset_id: str):
    return db.query(Asset).filter(Asset.id == asset_id).first()

# TODO: get_asset_versions

# TODO: download asset to temp directory then return file response
def read_version_file(db: Session, asset_id: str, semver: str):
    file = db.query(Version).filter(Version.asset_id == asset_id, Version.semver == semver).first()
    if file is None:
        return None
    return file.file_key

# TODO: create_version
