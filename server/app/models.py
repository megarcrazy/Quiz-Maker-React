from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship, declarative_base, Mapped


Base = declarative_base()


class Quiz(Base):
    __tablename__ = "quizzes"

    quiz_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title_text = Column(String(255), nullable=False)
    hidden = Column(Boolean, default=False, nullable=False)

    # Relationships
    question_list: Mapped[list["Question"]] = relationship(
        "Question", back_populates="quiz", cascade="all, delete-orphan"
    )


class Question(Base):
    __tablename__ = "questions"

    question_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.quiz_id", ondelete="CASCADE"), nullable=False)
    question_text = Column(Text, nullable=False)

    # Relationships
    quiz: Mapped["Quiz"] = relationship("Quiz", back_populates="question_list")
    answer_list: Mapped[list["Answer"]] = relationship(
        "Answer", back_populates="question", cascade="all, delete-orphan"
    )


class Answer(Base):
    __tablename__ = "answers"

    answer_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    question_id = Column(
        Integer, ForeignKey("questions.question_id", ondelete="CASCADE"), nullable=False
    )
    answer_text = Column(String(255), nullable=False)
    is_correct = Column(Boolean, nullable=False, default=False)

    # Relationships
    question: Mapped["Question"] = relationship("Question", back_populates="answer_list")
