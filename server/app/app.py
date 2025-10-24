from contextlib import asynccontextmanager
import socket
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import backend_router


def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
    except Exception:
        local_ip = "127.0.0.1"
    finally:
        s.close()
    return local_ip


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
