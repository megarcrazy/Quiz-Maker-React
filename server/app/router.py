import html
import random
from fastapi import APIRouter, Depends, HTTPException, status
import requests
from sqlalchemy.orm import Session, joinedload
from .schemas import (
    PlayQuizQuestionsSchema, QuestionSchema, AnswerSchema,
    FullQuizSchema, QuizResultSchema, SubmittedQuizSchema,
    QuestionResult, QuizListSchema, QuizListItem
)
from .database import get_db
from .models import Quiz, Question, Answer


backend_router = APIRouter()


@backend_router.get("/")
def base():
    result = "Home page. Nothing to see."
    return result


@backend_router.post("/add-quiz")
def add_quiz(quiz_data: FullQuizSchema, db: Session=Depends(get_db)):
    if not quiz_data.question_list:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quiz must have at least one question"
        )

    try:
        new_quiz = Quiz(title_text=quiz_data.title_text)
        for q in quiz_data.question_list:
            question = Question(question_text=q.question_text)
            for a in q.answer_list:
                answer = Answer(
                    answer_text=a.answer_text,
                    is_correct=a.is_correct
                )
                question.answer_list.append(answer)
            new_quiz.question_list.append(question)
        db.add(new_quiz)
        db.commit()
        db.refresh(new_quiz)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to add quiz"
        )

    result = {"message": f"Added quiz {new_quiz.quiz_id} successfully"}
    return result


@backend_router.get("/get-quiz-list", response_model=QuizListSchema)
def get_quiz_list(db: Session = Depends(get_db)):
    quizzes = db.query(Quiz).filter(Quiz.hidden == False).all()
    result = QuizListSchema(
        quiz_list=[
            QuizListItem(
                quiz_id=q.quiz_id,
                title_text=q.title_text
            )
            for q in quizzes
        ]
    )
    return result


@backend_router.get("/get-quiz-questions/{quiz_id}", response_model=PlayQuizQuestionsSchema)
def get_quiz_questions(quiz_id: int, db: Session=Depends(get_db)):
    quiz = (
        db.query(Quiz)
        .options(
            joinedload(Quiz.question_list)
            .joinedload(Question.answer_list)
        )
        .filter(Quiz.quiz_id == quiz_id, Quiz.hidden == False)
        .first()
    )

    if not quiz:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Quiz with id {quiz_id} not found"
        )

    result = PlayQuizQuestionsSchema(
        quiz_id=quiz.quiz_id,
        title_text=quiz.title_text,
        question_list=[
            QuestionSchema(
                question_id=q.question_id,
                question_text=q.question_text,
                choices=[
                    AnswerSchema(
                        answer_id=a.answer_id,
                        answer_text=a.answer_text
                    )
                    for a in q.answer_list
                ]
            )
            for q in quiz.question_list
        ]
    )

    return result


@backend_router.post("/mark-quiz", response_model=QuizResultSchema)
def mark_quiz(submit_quiz: SubmittedQuizSchema, db: Session=Depends(get_db)):
    # Load all questions for the quiz with their correct answers
    question_list = (
        db.query(Question)
        .filter(Question.quiz_id == submit_quiz.quiz_id)
        .options(joinedload(Question.answer_list.and_(Answer.is_correct == True)))
        .all()
    )
    if not question_list:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Quiz with ID {submit_quiz.quiz_id} not found"
        )

    score = 0
    results = []
    for question in question_list:
        # Get data base correct answer
        question_id = question.question_id
        answer_list = question.answer_list
        correct_answer_id = None
        if answer_list:
            correct_answer_id = answer_list[0].answer_id

        # Get user-selected answer if provided
        selected_answer_id = submit_quiz.user_answers.get(question_id)

        # Check if the user is correct
        is_correct = False
        if correct_answer_id is not None \
                and selected_answer_id is not None \
                and selected_answer_id == correct_answer_id:
            is_correct = True
            score += 1

        question_result = QuestionResult(
            question_id=question_id,
            selected_answer_id=selected_answer_id,
            is_correct=is_correct,
            correct_answer=correct_answer_id
        )
        results.append(question_result)

    quiz_result = QuizResultSchema(
        quiz_id=submit_quiz.quiz_id,
        score=score,
        total=len(question_list),
        results=results
    )
    return quiz_result


@backend_router.post("/update-quiz/{quiz_id}")
def update_quiz(quiz_id: int, quiz_data: FullQuizSchema, db: Session=Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.quiz_id == quiz_id, Quiz.hidden == False).first()
    if not quiz:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Quiz with id {quiz_id} not found"
        )

    try:
        quiz.title_text = quiz_data.title_text

        # Delete previous questions before adding new ones
        quiz.question_list.clear()

        # Insert new questions and answers
        for q in quiz_data.question_list:
            new_question = Question(question_text=q.question_text)
            for ans in q.answer_list:
                new_question.answer_list.append(
                    Answer(
                        answer_text=ans.answer_text,
                        is_correct=ans.is_correct
                    )
                )
            quiz.question_list.append(new_question)

        db.commit()
        db.refresh(quiz)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to update quiz {quiz_id}"
        )

    result = {"message": f"Updated quiz {quiz_id} successfully"}
    return result


@backend_router.post("/create-random-quiz", response_model=PlayQuizQuestionsSchema)
def create_random_quiz(db: Session=Depends(get_db)):
    # Fetch random quiz data from Open Trivia DB
    try:
        response = requests.get("https://opentdb.com/api.php?amount=10", timeout=5)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Failed to fetch quiz data from Open Trivia DB: {str(e)}"
        )

    if data.get("response_code") != 0 or not data.get("results"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Trivia API returned invalid data"
        )

    try:
        new_quiz = Quiz(title_text="Random Quiz", hidden=True)
        for item in data["results"]:
            question_text = html.unescape(item["question"])
            question = Question(question_text=question_text)
            answers = item["incorrect_answers"] + [item["correct_answer"]]
            random.shuffle(answers)
            for ans_text in answers:
                is_correct = ans_text == item["correct_answer"]
                answer = Answer(
                    answer_text=html.unescape(ans_text),
                    is_correct=is_correct
                )
                question.answer_list.append(answer)
            new_quiz.question_list.append(question)

        db.add(new_quiz)
        db.commit()
        db.refresh(new_quiz)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to add random quiz"
        )

    # Build response (similar to get-quiz-questions)
    quiz_response = PlayQuizQuestionsSchema(
        quiz_id=new_quiz.quiz_id,
        title_text=new_quiz.title_text,
        question_list=[
            QuestionSchema(
                question_id=q.question_id,
                question_text=q.question_text,
                choices=[
                    AnswerSchema(
                        answer_id=a.answer_id,
                        answer_text=a.answer_text
                    )
                    for a in q.answer_list
                ]
            )
            for q in new_quiz.question_list
        ]
    )
    return quiz_response


@backend_router.delete("/delete-quiz/{quiz_id}")
def delete_quiz(quiz_id: int, db: Session=Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.quiz_id == quiz_id, Quiz.hidden == False).first()
    if not quiz:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Quiz with id {quiz_id} not found"
        )

    db.delete(quiz)
    db.commit()
    result = {"message": f"Quiz {quiz_id} deleted successfully"}
    return result
