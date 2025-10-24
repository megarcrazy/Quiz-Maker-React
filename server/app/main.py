import uvicorn
from app.network import get_local_ip


def main() -> None:
    local_ip = get_local_ip()
    uvicorn.run("app.app:app", host=local_ip, port=8000, reload=True)


if __name__ == "__main__":
    main()
