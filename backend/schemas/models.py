from typing import List, Optional
from pydantic import BaseModel


class AssetBase(BaseModel):
    asset_name: str
    author_pennkey: str
    keywords: str
    image_url: Optional[str]


class AssetCreate(AssetBase):
    pass


class Asset(AssetBase):
    id: str
    versions: List["Version"]

    class Config:
        from_attributes = True


class VersionBase(BaseModel):
    author_pennkey: str
    asset_id: str
    semver: str
    file_key: str


class VersionCreate(AssetBase):
    pass


class Version(AssetBase):
    asset: "Asset"

    class Config:
        from_attributes = True
