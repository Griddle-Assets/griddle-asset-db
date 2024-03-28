import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")

if SQLALCHEMY_DATABASE_URI == None:
    raise RuntimeError("DATABASE_URI environment variable not provided!")

engine = create_engine(SQLALCHEMY_DATABASE_URI, connect_args={})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
