from uuid import UUID, uuid4
from sqlalchemy import ForeignKey, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.connection import Base


def random_uuid():
    return str(uuid4())


class Asset(Base):
    __tablename__ = "assets"

    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=uuid4
    )
    asset_name: Mapped[str] = mapped_column()
    author_pennkey: Mapped[str] = mapped_column()
    keywords: Mapped[str] = mapped_column()
    image_url: Mapped[str] = mapped_column()

    versions: Mapped[list["Version"]] = relationship(back_populates="asset")


class Version(Base):
    __tablename__ = "versions"

    asset_id: Mapped[UUID] = mapped_column(ForeignKey("assets.id"), primary_key=True)
    asset: Mapped["Asset"] = relationship(back_populates="versions")
    semver: Mapped[str] = mapped_column(default="0.1", primary_key=True)

    author_pennkey: Mapped[str] = mapped_column()

    file_key: Mapped[str] = mapped_column()
