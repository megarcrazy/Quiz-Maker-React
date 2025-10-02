from typing import Iterator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from .models import Base


def get_db() -> Iterator[Session]:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./db/app.db"
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        yield db
