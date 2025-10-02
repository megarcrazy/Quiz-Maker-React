from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.router import backend_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(backend_router)
