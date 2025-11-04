# Quizzer Website

A **React + FastAPI** web app where users can play, edit, or generate quizzes.  
Quizzes can be loaded from a **database** or fetched randomly from the internet.

---

## Project Structure

├── client/ # React frontend\
└── server/ # FastAPI backend (Python)

---

## Getting Started

Before starting the app, make sure to install dependencies in both the **frontend** and **backend**.

### Setup Steps

Run the following commands in your terminal:

#### Step 1: Install frontend dependencies
```
cd client
npm install
```
#### Step 2: Create a virtual environment for the backend
```
cd ../server
python -m venv .venv
.venv\Scripts\activate
source .venv/bin/activate
```
#### Step 3: Install backend dependencies
```
pip install -r requirements.txt
```
#### Step 4: Run the backend
```
uvicorn main:app --reload
```
By default, the backend runs at
http://127.0.0.1:8000
#### Step 5: Run the frontend
Open a new terminal (keep the backend running) and from /client:
```
npm start
```
The React app runs at
http://localhost:3000
---
