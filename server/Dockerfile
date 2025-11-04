FROM python:3.11-slim

# Install Python libraries
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app
COPY . .

# FastAPI backend port
EXPOSE 8000

# Run
CMD ["python", "-m", "app.main"]
