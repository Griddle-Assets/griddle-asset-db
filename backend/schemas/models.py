from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class AssetBase(BaseModel):
    asset_name: str
    keywords: str
    image_uri: Optional[str]


class AssetCreate(AssetBase):
    pass


class Asset(AssetBase):
    id: UUID
    author_pennkey: str

    class Config:
        from_attributes = True


class VersionBase(BaseModel):
    asset_id: UUID
    file_key: str


class Version(VersionBase):
    semver: str
    author_pennkey: str

    class Config:
        from_attributes = True
