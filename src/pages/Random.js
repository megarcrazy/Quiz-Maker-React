import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Components
import RandomTable from '../components/Random/randomTable.js';
// Styles
import '../components/css/quiz.css';

function Random() {

    let [quizData, setQuizData] = useState([]);
    let [buttonText, setButtonText] = useState("Submit");
    let [submitted, setSubmitted] = useState(false); 
    const [userSelection, setUserSelection] = useState(
        new Array(quizData.length).fill(null)
    );

    const title = "Random Quiz";
    const message = `The random quiz API was extracted from`;

    useEffect(() => {
        const url = "https://opentdb.com/api.php?amount=10&difficulty=easy";
        axios.get(url)
        .then(response => { 
            const quizData = response.data.results; 
            setQuizData(quizData) 
        })
        .catch(error => { console.error(error) });
    }, []);

    const submitQuiz = () => {
        setSubmitted(true);
        (submitted) && window.location.reload();   
        setButtonText((submitted) ? "Submit" : "Try Again");
    }
    const getScore = () => {
        let score = 0;
        return score;
    }
    const score = getScore();

    const tables = [...Array(quizData.length).keys()].map((questionNumber) => {
        const currentData = quizData[questionNumber];
        return <RandomTable 
        key={questionNumber}
        questionNumber={questionNumber}
        question={currentData["question"]}
        correctAnswer={currentData["correct_answer"]}
        incorrectAnswer={currentData["incorrect_answers"]}
        submitted={submitted}
        changeUserSelection={
            (index, choice) => 
            setUserSelection(
                [
                    ...userSelection.slice(0, index), 
                    choice,
                    ...userSelection.slice(index + 1)
                ]
            )
        } />
    });

    const submitButton = 
    <button className="btn btn-secondary my-button-style middle" 
    id="submit-button" onClick={submitQuiz}>
        {buttonText}
    </button>

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>
                {message} <a href="https://opentdb.com/api_config.php">Open Trivia Database</a>.
            </p>
            {tables}
            {submitButton}
            <br />
            <div className="middle">
                {submitted ? 
                <>Your Score is {score} / {quizData.length}</>
                :
                <br />}
            </div>
            <br />
        </div>
    )
}

export default Random;
