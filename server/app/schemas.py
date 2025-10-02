from pydantic import BaseModel


# Full quiz data
class FullQuizSchema(BaseModel):
    title_text: str
    question_list: list["FullQuizQuestion"]


class FullQuizQuestion(BaseModel):
    question_text: str
    answer_list: list["FullQuizAnswer"]


class FullQuizAnswer(BaseModel):
    answer_text: str
    is_correct: bool


# User receving questions to play a quiz
class PlayQuizQuestionsSchema(BaseModel):
    quiz_id: int
    title_text: str
    question_list: list["QuestionSchema"]


class QuestionSchema(BaseModel):
    question_id: int
    question_text: str


# User submitting their quiz answers and marking the quiz
class SubmittedQuizSchema(BaseModel):
    quiz_id: int
    question_list: list["SubmittedQuizQuestion"]


class SubmittedQuizQuestion(BaseModel):
    question_id: int
    answer_id: int


# User receiving the marked quiz
class QuizResultSchema(BaseModel):
    quiz_id: int
    score: int
    total: int
    results: list["QuestionResult"]


class QuestionResult(BaseModel):
    question_id: int
    selected_answer_id: int
    is_correct: bool
    correct_answer_list: list[int]
