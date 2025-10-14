from typing import Iterator
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
from app.app import app
from app.database import get_db
from app.models import Base, Quiz, Question, Answer


SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture()
def db_session() -> Iterator[Session]:
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    yield session
    session.close()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="module")
def client_session() -> Iterator[TestClient]:
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()


# Tests
def test_add_quiz_success(client_session: TestClient, db_session: Session):
    # Arrange
    quiz_data = {
        "title_text": "myQuiz",
        "question_list": [
            {
                "question_text": "What is the capital of France?",
                "answer_list": [
                    {
                        "answer_text": "Paris",
                        "is_correct": True
                    },
                    {
                        "answer_text": "London",
                        "is_correct": False
                    },
                    {
                        "answer_text": "Berlin",
                        "is_correct": False
                    },
                    {
                        "answer_text": "Madrid",
                        "is_correct": False
                    },
                ]
            },
            {
                "question_text": "What is 2+2?",
                "answer_list": [
                    {
                        "answer_text": "4",
                        "is_correct": True
                    },
                    {
                        "answer_text": "3",
                        "is_correct": False
                    },
                    {
                        "answer_text": "5",
                        "is_correct": False
                    },
                    {
                        "answer_text": "6",
                        "is_correct": False
                    }
                ]
            }
        ]
    }

    # Act
    response = client_session.post("/add-quiz", json=quiz_data)

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Added quiz 1 successfully"


def test_add_quiz_empty_results_raises(client_session: TestClient, db_session: Session):
    # Arrange
    quiz_data = {
        "response_code": 0,
        "title_text": "myQuiz",
        "question_list": []
    }

    # Act
    response = client_session.post("/add-quiz", json=quiz_data)

    # Assert
    assert response.status_code == 400
    response_data = response.json()
    assert response_data["detail"] == "Quiz must have at least one question"


def test_get_quiz_successfully(client_session: TestClient, db_session: Session):
    # Arrange
    quiz = Quiz(
        quiz_id=2,
        title_text="myQuiz",
        question_list=[
            Question(
                question_text="What is the capital of France?",
                answer_list=[
                    Answer(answer_text="Paris", is_correct=True),
                    Answer(answer_text="London", is_correct=False),
                    Answer(answer_text="Berlin", is_correct=False),
                    Answer(answer_text="Madrid", is_correct=False),
                ]
            ),
        ]
    )
    db_session.add(quiz)
    db_session.commit()
    db_session.refresh(quiz)

    # Act
    response = client_session.get("/get-quiz-questions/2")

    # Assert
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["quiz_id"] == 2
    assert response_data["title_text"] == "myQuiz"
    assert len(response_data["question_list"]) == 1
    assert response_data["question_list"][0]["question_id"] == 1
    assert response_data["question_list"][0]["question_text"] == "What is the capital of France?"
    expected_choices = [
        {"answer_id": 3, "answer_text": "Berlin"},
        {"answer_id": 2, "answer_text": "London"},
        {"answer_id": 4, "answer_text": "Madrid"},
        {"answer_id": 1, "answer_text": "Paris"},
    ]
    response_choices = response_data["question_list"][0]["choices"]
    assert sorted(response_choices, key=lambda d: d["answer_id"]) \
        == sorted(expected_choices, key=lambda d: d["answer_id"])


def test_get_quiz_unsuccessfully(client_session: TestClient, db_session: Session):
    # Arrange
    quiz = Quiz(
        quiz_id=2,
        title_text="myQuiz",
        question_list=[
            Question(
                question_text="What is the capital of France?",
                answer_list=[
                    Answer(answer_text="Paris", is_correct=True),
                    Answer(answer_text="London", is_correct=False),
                ]
            ),
        ]
    )
    db_session.add(quiz)
    db_session.commit()
    db_session.refresh(quiz)

    # Act
    response = client_session.get("/get-quiz-questions/1")

    # Assert
    assert response.status_code == 404
    response_data = response.json()
    assert response_data["detail"] == "Quiz with id 1 not found"


def test_delete_quiz_successfully(client_session: TestClient, db_session: Session):
    # Arrange
    quiz = Quiz(
        quiz_id=2,
        title_text="myQuiz",
        question_list=[
            Question(
                question_text="What is the capital of France?",
                answer_list=[
                    Answer(answer_text="Paris", is_correct=True),
                    Answer(answer_text="London", is_correct=False),
                ]
            ),
        ]
    )
    db_session.add(quiz)
    db_session.commit()
    db_session.refresh(quiz)

    # Act
    response = client_session.delete("/delete-quiz/2")

    # Assert
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["message"] == "Quiz 2 deleted successfully"


def test_delete_quiz_failed(client_session: TestClient, db_session: Session):
    # Arrange
    quiz = Quiz(
        quiz_id=2,
        title_text="myQuiz",
        question_list=[
            Question(
                question_text="What is the capital of France?",
                answer_list=[
                    Answer(answer_text="Paris", is_correct=True),
                    Answer(answer_text="London", is_correct=False),
                ]
            ),
        ]
    )
    db_session.add(quiz)
    db_session.commit()
    db_session.refresh(quiz)

    # Act
    response = client_session.delete("/delete-quiz/1")

    # Assert
    assert response.status_code == 404
    response_data = response.json()
    assert response_data["detail"] == "Quiz with id 1 not found"


def test_mark_quiz_success(client_session: TestClient, db_session: Session):
    # Arrange
    quiz = Quiz(
        quiz_id=1,
        title_text="Sample Quiz",
        question_list=[
            Question(
                question_id=101,
                question_text="What is the capital of France?",
                answer_list=[
                    Answer(answer_id=1001, answer_text="Paris", is_correct=True),
                    Answer(answer_id=1002, answer_text="Berlin", is_correct=False),
                ]
            ),
            Question(
                question_id=102,
                question_text="2+2?",
                answer_list=[
                    Answer(answer_id=1003, answer_text="4", is_correct=True),
                    Answer(answer_id=1004, answer_text="5", is_correct=False),
                ]
            ),
        ]
    )
    db_session.add(quiz)
    db_session.commit()
    db_session.refresh(quiz)

    submitted_quiz = {
        "quiz_id": 1,
        "question_list": [
            {"question_id": 101, "answer_id": 1001},
            {"question_id": 102, "answer_id": 1004},
        ]
    }

    # Act
    response = client_session.post("/mark-quiz", json=submitted_quiz)

    # Assert
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["quiz_id"] == 1
    assert response_data["score"] == 1
    assert response_data["total"] == 2
    assert response_data["results"][0]["is_correct"] is True
    assert response_data["results"][1]["is_correct"] is False


def test_mark_quiz_quiz_not_found(client_session: TestClient, db_session: Session):
    # Arrange
    submitted_quiz = {
        "quiz_id": 999,
        "question_list": []
    }

    # Act
    response = client_session.post("/mark-quiz", json=submitted_quiz)

    # Assert
    assert response.status_code == 404
    response_data = response.json()
    assert response_data["detail"] == "Quiz with ID 999 not found"


def test_update_quiz_successfully(client_session: TestClient, db_session: Session):
    # Arrange
    quiz = Quiz(
        quiz_id=1,
        title_text="Sample Quiz",
        question_list=[
            Question(
                question_id=101,
                question_text="What is the capital of France?",
                answer_list=[
                    Answer(answer_id=1001, answer_text="Paris", is_correct=True),
                    Answer(answer_id=1002, answer_text="Berlin", is_correct=False),
                ]
            ),
        ]
    )
    db_session.add(quiz)
    db_session.commit()
    db_session.refresh(quiz)

    new_quiz_data = {
        "title_text": "Sample Quiz 2",
        "question_list": [
            {
                "question_text": "What is 2 + 2?",
                "answer_list": [
                    {"answer_text": "3", "is_correct": False},
                    {"answer_text": "4", "is_correct": True},
                    {"answer_text": "5", "is_correct": False},
                ]
            },
            {
                "question_text": "What is the capital of Germany?",
                "answer_list": [
                    {"answer_text": "Berlin", "is_correct": True},
                    {"answer_text": "Paris", "is_correct": False},
                ]
            }
        ]
    }

    # Act
    response = client_session.post("/update-quiz/1", json=new_quiz_data)

    # Assert
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["message"] == "Updated quiz 1 successfully"

    # Database check
    db_session.refresh(quiz)
    updated_quiz = db_session.query(Quiz).filter(Quiz.quiz_id == 1).first()
    assert updated_quiz.title_text == "Sample Quiz 2"
    assert len(updated_quiz.question_list) == 2

    question_texts = [q.question_text for q in updated_quiz.question_list]
    assert "What is 2 + 2?" in question_texts
    assert "What is the capital of Germany?" in question_texts

    # Check answers for each question
    for q in updated_quiz.question_list:
        if q.question_text == "What is 2 + 2?":
            answer_texts = [a.answer_text for a in q.answer_list]
            assert set(answer_texts) == {"3", "4", "5"}
            correct_answer = [a for a in q.answer_list if a.is_correct]
            assert len(correct_answer) == 1
            assert correct_answer[0].answer_text == "4"
        elif q.question_text == "What is the capital of Germany?":
            answer_texts = [a.answer_text for a in q.answer_list]
            assert set(answer_texts) == {"Berlin", "Paris"}
            correct_answer = [a for a in q.answer_list if a.is_correct]
            assert len(correct_answer) == 1
            assert correct_answer[0].answer_text == "Berlin"


def test_update_quiz_unsuccessfully(client_session: TestClient, db_session: Session):
    new_quiz_data = {
        "title_text": "Sample Quiz 2",
        "question_list": [
            {
                "question_text": "What is 2 + 2?",
                "answer_list": [
                    {"answer_text": "3", "is_correct": False},
                    {"answer_text": "4", "is_correct": True},
                    {"answer_text": "5", "is_correct": False},
                ]
            },
            {
                "question_text": "What is the capital of Germany?",
                "answer_list": [
                    {"answer_text": "Berlin", "is_correct": True},
                    {"answer_text": "Paris", "is_correct": False},
                ]
            }
        ]
    }

    # Act
    response = client_session.post("/update-quiz/2", json=new_quiz_data)

    # Assert
    assert response.status_code == 404
    response_data = response.json()
    assert response_data["detail"] == "Quiz with id 2 not found"


def test_add_random_quiz_successful(client_session: TestClient, db_session: Session):
    # Arrange
    fake_trivia_response = {
        "response_code": 0,
        "results": [
            {
                "type": "multiple",
                "difficulty": "easy",
                "category": "General Knowledge",
                "question": "What is 2+2?",
                "correct_answer": "4",
                "incorrect_answers": ["3", "5", "6"]
            },
            {
                "type": "boolean",
                "difficulty": "easy",
                "category": "Science",
                "question": "The Earth is flat.",
                "correct_answer": "False",
                "incorrect_answers": ["True"]
            }
        ]
    }

    with patch("requests.get") as mock_get:
        mock_resp = MagicMock()
        mock_resp.json.return_value = fake_trivia_response
        mock_get.return_value = mock_resp

        # Act
        response = client_session.post("/create-random-quiz")

        # Assert
        assert response.status_code == 200
        response_data = response.json()
        assert response_data["quiz_id"] == 1
        assert response_data["title_text"] == "Random Quiz"
        assert len(response_data["question_list"]) == 2
        assert response_data["question_list"][0]["question_id"] == 1
        assert response_data["question_list"][0]["question_text"] == "What is 2+2?"
        assert response_data["question_list"][1]["question_id"] == 2
        assert response_data["question_list"][1]["question_text"] == "The Earth is flat."
        expected_choices_q1 = ["3", "4", "5", "6"]
        response_choices_q1 = [choice["answer_text"] for choice in response_data["question_list"][0]["choices"]]
        assert sorted(response_choices_q1) == sorted(expected_choices_q1)

        # Choices for second question
        expected_choices_q2 = ["False", "True"]
        response_choices_q2 = [choice["answer_text"] for choice in response_data["question_list"][1]["choices"]]
        assert sorted(response_choices_q2) == sorted(expected_choices_q2)

        # Check if hidden value is True
        quiz = db_session.query(Quiz).filter(Quiz.quiz_id == 1).first()
        assert quiz is not None
        assert quiz.hidden == True


def test_add_random_quiz_unsuccessful(client_session: TestClient, db_session: Session):
    # Arrange
    fake_trivia_response = {
        "response_code": 1,
        "results": []
    }

    with patch("requests.get") as mock_get:
        mock_resp = MagicMock()
        mock_resp.json.return_value = fake_trivia_response
        mock_get.return_value = mock_resp

        # Act
        response = client_session.post("/create-random-quiz")

        # Assert
        assert response.status_code == 400
        response_data = response.json()
        assert response_data["detail"] == "Trivia API returned invalid data"


def test_get_quiz_list(client_session: TestClient, db_session: Session):
    # Arrange
    quiz1 = Quiz(title_text="Math Quiz", hidden=False)
    quiz2 = Quiz(title_text="Science Quiz", hidden=False)
    quiz3 = Quiz(title_text="Hidden Quiz", hidden=True)
    db_session.add_all([quiz1, quiz2, quiz3])
    db_session.commit()

    # Act
    response = client_session.get("/get-quiz-list")

    # Assert
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["quiz_list"] == [
        {"quiz_id": 1, "title_text": "Math Quiz"},
        {"quiz_id": 2, "title_text": "Science Quiz"}
    ]


def test_get_empty_quiz_list(client_session: TestClient, db_session: Session):
    # Arrange
    quiz1 = Quiz(title_text="Science Quiz", hidden=True)
    quiz2 = Quiz(title_text="Hidden Quiz", hidden=True)
    db_session.add_all([quiz1, quiz2])
    db_session.commit()

    # Act
    response = client_session.get("/get-quiz-list")

    # Assert
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["quiz_list"] == []
