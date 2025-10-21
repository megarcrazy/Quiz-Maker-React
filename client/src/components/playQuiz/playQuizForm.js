import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from 'styled-components';
import QuizQuestionTable from './quizQuestionTable';
import QuizQuestionResultTable from './quizQuestionResultTable';
import SubmitQuizButton from './submitQuizButton';

const QuizForm = styled.form`
    display: table;
    margin-left: auto;
    margin-right: auto;
`;

export default function PlayQuizForm({ quizData }) {
    const [submitted, setSubmitted] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizResult, setQuizResult] = useState(null);

    // Reset answers when a new quiz is loaded
    useEffect(() => {
        if (quizData?.question_list) {
            setUserAnswers({});
            setSubmitted(false);
            setQuizResult(null);
        }
    }, [quizData]);

    // Submit handler
    const submitQuiz = async (e) => {
        e.preventDefault();
        if (submitted) return;

        try {
            const payload = {
                quiz_id: quizData.quiz_id,
                user_answers: userAnswers,
            };
            console.log(payload)
            const res = await axios.post("http://localhost:8000/mark-quiz", payload);
            setQuizResult(res.data);
            setSubmitted(true);
        } catch (err) {
            console.error(err);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Select answer handler
    const handleSelect = (questionID, choice) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionID]: choice
        }));
    };

    // Retry quiz
    const handleRetry = () => {
        setSubmitted(false);
        setQuizResult(null);
        setUserAnswers({});
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Render quiz or result tables
    const tables = (quizData?.question_list ?? []).map((question, idx) => {
        if (submitted && quizResult) {
            const result = quizResult.results.find(r => r.question_id === question.question_id);
            return (
                <QuizQuestionResultTable
                    key={question.question_id ?? idx}
                    questionIndex={idx}
                    questionID={question.question_id}
                    questionText={question.question_text}
                    choicesData={question.choices}
                    selectedAnswerID={result?.selected_answer_id}
                    correctAnswerID={result?.correct_answer}
                />
            );
        } else {
            return (
                <QuizQuestionTable
                    key={question.question_id ?? idx}
                    questionIndex={idx}
                    questionID={question.question_id}
                    questionText={question.question_text}
                    choicesData={question.choices}
                    handleSelect={handleSelect}
                />
            );
        }
    });

    return (
        <QuizForm onSubmit={submitQuiz}>
            {submitted && quizResult && (
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <strong>
                        You scored {quizResult.score} / {quizResult.total}
                    </strong>
                </div>
            )}
            {tables}
            <SubmitQuizButton
                submitted={submitted}
                onClick={submitted ? handleRetry : submitQuiz}
            />
        </QuizForm>
    );
}