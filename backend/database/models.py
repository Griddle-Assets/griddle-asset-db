from datetime import datetime
from uuid import UUID, uuid4
from sqlalchemy import ForeignKey, Uuid, func
from sqlalchemy.orm import Mapped, mapped_column, declarative_base, relationship

Base = declarative_base()


def random_uuid():
    return str(uuid4())


class Asset(Base):
    __tablename__ = "assets"

    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, insert_default=uuid4
    )
    asset_name: Mapped[str]
    author_pennkey: Mapped[str]
    keywords: Mapped[str]
    image_uri: Mapped[str]

    versions: Mapped[list["Version"]] = relationship(back_populates="asset")


class Version(Base):
    __tablename__ = "versions"

    asset_id: Mapped[UUID] = mapped_column(ForeignKey("assets.id"), primary_key=True)
    asset: Mapped["Asset"] = relationship(back_populates="versions")
    semver: Mapped[str] = mapped_column(insert_default="0.1", primary_key=True)

    author_pennkey: Mapped[str]
    date: Mapped[datetime] = mapped_column(insert_default=func.now())
    message: Mapped[str]

    file_key: Mapped[str]
