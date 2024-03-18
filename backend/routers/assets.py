from typing import List, Annotated, Optional
from fastapi import APIRouter, Body
from pydantic import BaseModel, Field

router = APIRouter(
    prefix="/assets",
    # TODO: add tags
    # responses={404: {"description": "Not found"}},
)


class AssetInsert(BaseModel):
    asset_name: str = Field(
        description="Camel-case asset name",
        pattern="^[a-z]+([A-Z][a-z]*)*$",
        examples=["myAsset"],
    )
    keywords: Optional[List[str]] = Field(
        None,
        description="A list of lowercase keywords that relate to this asset",
        examples=[["kitchen", "utensils"]],
    )
    image_url: Optional[str] = Field(None, examples=["https://placekitten.com/400/400"])


@router.post("/")
async def create_asset(asset: Annotated[AssetInsert, Body(embed=True)]) -> str:
    return "hello, " + asset.asset_name
