from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
from pydantic import BaseModel
from datetime import datetime
from uuid import uuid4
import csv

app = FastAPI()
DATABASE_URL = "postgresql://filmflow:password@localhost:5432/filmflow"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class MovieBase(BaseModel):
    title: str
    release_date: datetime
    gender: str
    description: str
    image: str = None
class Movie(Base):
    __tablename__ = "Movie"

    id = Column(String, primary_key=True)
    title = Column(String)
    release_date = Column(DateTime)
    gender = Column(String)
    description = Column(String)
    image = Column(String)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

@app.get("/movies")
def add_movie():
    db = SessionLocal()
    with open('shared/imdb_top_1000.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            new_movie = Movie(
                id=str(uuid4()),  # Gera um ID único para o filme
                image=row[0],
                title=row[1],
                gender=row[5],
                description=row[7],
                release_date="1970-01-01T00:00:00.000Z",
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            db.add(new_movie)
            db.commit()
            db.refresh(new_movie)
    db.close()
    return {"message": "Movies added successfully"}