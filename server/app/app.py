from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.network import get_local_ip
from app.router import backend_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(lifespan=lifespan)
local_ip = get_local_ip()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://localhost:3000",
        "http://localhost:3000",
        f"http://{local_ip}:3000",
        f"https://{local_ip}:3000",
    ],
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
)
app.include_router(backend_router)
