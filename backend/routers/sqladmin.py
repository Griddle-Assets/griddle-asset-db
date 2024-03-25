from fastapi import FastAPI
from sqladmin import Admin, ModelView

from database.connection import engine
from database.models import Asset, Version


class AssetAdmin(ModelView, model=Asset):
    column_list = [
        Asset.id,
        Asset.asset_name,
        Asset.author_pennkey,
        Asset.keywords,
    ]


class VersionAdmin(ModelView, model=Version):
    column_list = [
        Version.semver,
        Version.author_pennkey,
        Version.file_key,
    ]


def config_sqladmin(app: FastAPI):
    admin = Admin(app, engine)
    admin.add_view(AssetAdmin)
    admin.add_view(VersionAdmin)
