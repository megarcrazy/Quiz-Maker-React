import React from 'react';
import { useHistory } from "react-router-dom"
// Components
import EditQuizTable from './editQuizTable.js';

function PageEdit({ quizData }) {
    let history = useHistory();

    const tables = [...Array(quizData.length).keys()].map((questionNumber) => {
        const currentData = quizData[questionNumber];
        return <EditQuizTable 
        key={questionNumber}
        questionNumber={questionNumber}
        question={currentData["question"]}
        correctAnswer={currentData["correct_answer"]}
        incorrectAnswer={currentData["incorrect_answers"]}
        />
    });

    const submitQuiz = () => {
        history.push("/quiz")
    }

    const submitButton = 
    <button className="btn btn-secondary my-button-style middle" 
    id="submit-button"
    onClick={submitQuiz}>
        Confirm
    </button>

    return (
        <form className="add-input">
            {tables}
            <br />
            {submitButton}
            <br />
            <br />
        </form>
    )
};

export default PageEdit;