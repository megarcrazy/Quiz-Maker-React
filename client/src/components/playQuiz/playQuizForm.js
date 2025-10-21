import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// Components
import QuizQuestionTable from './quizQuestionTable';
import SubmitQuizButton from './submitQuizButton';


const QuizForm = styled.form`
    display: table;
    margin-left: auto;
    margin-right: auto;
`;


export default function PlayQuizForm({ quizData }) {
    const [submitted, setSubmitted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);  // Use answer ID for multiple choice

    useEffect(() => {
        if (quizData?.question_list) {
            setUserAnswers(new Array(quizData.question_list.length).fill(null));
        }
    }, [quizData]);

    const submitQuiz = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleSelect = (questionID, choice) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionID]: choice
        }));
    };

    const tables = (quizData?.question_list ?? []).map((question, idx) => (
        <QuizQuestionTable
            key={question.question_id ?? idx}
            questionIndex={idx}
            questionID={question.question_id}
            questionText={question.question_text}
            choicesData={question.choices}
            handleSelect={handleSelect}
        />
    ));

    return (
        <QuizForm onSubmit={submitQuiz}>
            {tables}
            <SubmitQuizButton submitted={submitted} />
        </QuizForm>
    );
}