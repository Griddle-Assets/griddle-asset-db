from typing import List
from uuid import uuid4
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


def random_uuid():
    return str(uuid4())


class Asset(Base):
    __tablename__ = "assets"

    id: Mapped[str] = mapped_column(primary_key=True, default=random_uuid)
    asset_name: Mapped[str] = mapped_column()
    author_pennkey: Mapped[str] = mapped_column()
    keywords: Mapped[str] = mapped_column()
    image_url: Mapped[str] = mapped_column()

    versions: Mapped[List["Version"]] = relationship(back_populates="asset")


class Version(Base):
    __tablename__ = "versions"

    asset_id: Mapped[str] = mapped_column(ForeignKey("assets.id"), primary_key=True)
    asset: Mapped["Asset"] = relationship(back_populates="versions")
    semver: Mapped[str] = mapped_column(default="0.1", primary_key=True)

    author_pennkey: Mapped[str] = mapped_column()

    file_key: Mapped[str] = mapped_column()
