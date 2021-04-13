import React, { useState } from 'react';
import { useParams } from "react-router-dom";
// Components
import QuizTable from '../components/Play/quizTable.js';
// Styles
import '../components/css/quiz.css';
// Data
import data from '../local/quizData.json';

function Play() {
    let [submitted, setSubmitted] = useState(false); 
    let [buttonText, setButtonText] = useState("Submit");

    const { number } = useParams();
    const currentQuizData = data[number - 1];
    const title = `${currentQuizData["Title"]}`;
    const message = "Please answer all the questions and submit."

    // Submit Button
    const submitQuiz = (e) => {
        e.preventDefault();
        setSubmitted(!submitted);
        setButtonText((submitted) ? "Submit" : "Try Again");
    }
    const submitButton = <button 
    className="btn btn-secondary my-button-style middle" 
    id="submit-button"
    onClick={submitQuiz}>
        {buttonText}
    </button>
    
    // Tables
    const tables = Array.from(Array(data[number - 1]["Questions"].length).keys()).map((number) =>
        <QuizTable key={number} number={number} data={data[number]}/>
    );

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            {tables}
            {submitButton}
        </div>
    )
}

export default Play;