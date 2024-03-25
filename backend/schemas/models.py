from typing import List, Optional
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
    pass


class VersionCreate(VersionBase):
    is_major: bool = False
    pass


class Version(VersionBase):
    asset_id: str
    semver: str
    author_pennkey: str
    file_key: str

    class Config:
        from_attributes = True
