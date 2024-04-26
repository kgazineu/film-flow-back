from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, String, Table, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://filmflow:password@localhost:5432/filmflow"

metadata = MetaData(schema="my_schema")

engine = create_engine(DATABASE_URL)

my_table = Table("my_table", metadata, autoload_with=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)

app = FastAPI()

@app.get("/users")
def get_user():
    db = SessionLocal()
    users = db.query(User).all()
    return users

