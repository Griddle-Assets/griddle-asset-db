from typing import Optional
from pydantic import BaseModel


class AssetBase(BaseModel):
    asset_name: str
    keywords: str
    image_url: Optional[str]


class AssetCreate(AssetBase):
    pass


class Asset(AssetBase):
    id: str
    author_pennkey: str

    class Config:
        from_attributes = True


class VersionBase(BaseModel):
    asset_id: str
    file_key: str


class Version(VersionBase):
    semver: str
    author_pennkey: str

    class Config:
        from_attributes = True
