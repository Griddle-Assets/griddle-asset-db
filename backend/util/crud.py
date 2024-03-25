from sqlalchemy.orm import Session
from uuid import uuid4

from schemas.models import AssetCreate
from database.models import Asset

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

# TODO: create_version
