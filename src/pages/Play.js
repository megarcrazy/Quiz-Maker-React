import React, { useState } from 'react';
import { useParams } from "react-router-dom";
// Components
import QuizTable from '../components/Play/quizTable.js';
// Styles
import '../components/css/quiz.css';
// Data
import data from '../local/quizData.json';

function Play() {
    
    const { number } = useParams();
    
    const currentQuizData = data[number - 1];
    const quizLength = currentQuizData["Questions"].length;

    const [submitted, setSubmitted] = useState(false); 
    const [buttonText, setButtonText] = useState("Submit");
    const [userSelection, setUserSelection] = useState(
        new Array(currentQuizData["Questions"].length).fill(null)
    );

    const title = currentQuizData["Title"];
    const message = "Please answer all the questions and submit."

    // Tables
    let tables = 
    [...Array(quizLength).keys()].map
    (
        (questionNumber) =>
        <QuizTable key={questionNumber} questionNumber={questionNumber} 
        data={currentQuizData} submitted={submitted}
        changeUserSelection={
            (index, choice) => 
            setUserSelection(
                [
                    ...userSelection.slice(0, index), 
                    choice,
                    ...userSelection.slice(index + 1)
                ]
            )
        } 
        />
    )

    // Submit Button
    const submitQuiz = () => {
        setSubmitted(true);
        (submitted) && window.location.reload();   
        setButtonText((submitted) ? "Submit" : "Try Again");
    }
    const submitButton = 
    <button className="btn btn-secondary my-button-style middle" 
    id="submit-button" onClick={submitQuiz}>
        {buttonText}
    </button>

    const getScore = () => {
        let score = 0;
        for (let i = 0; i < quizLength; i++) {
            if (userSelection[i] === currentQuizData["Answers"][i]) {
                score++;
            }
        }
        return score;
    }
    const score = getScore();

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            {tables}
            {submitButton}
            <br />
            <div className="middle">
                {submitted ? 
                <>Your Score is {score} / {quizLength}</>
                :
                <br />}
            </div>
            <br />
        </div>
    )
}

export default Play;