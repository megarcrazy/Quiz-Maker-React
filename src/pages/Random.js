import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Components
import RandomTable from '../components/Random/randomTable.js';
// Styles
import '../components/css/quiz.css';

function Random() {

    const [quizData, setQuizData] = useState([]);
    let [submitted, setSubmitted] = useState(false); 
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

    const tables = [...Array(quizData.length).keys()].map((questionNumber) => {
        const currentData = quizData[questionNumber];
        return <RandomTable 
        key={questionNumber}
        questionNumber={questionNumber}
        question={currentData["question"]}
        correctAnswer={currentData["correct_answer"]}
        incorrectAnswer={currentData["incorrect_answers"]}
        submitted={submitted}/>
    });

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>
                {message} <a href="https://opentdb.com/api_config.php">Open Trivia Database</a>.
            </p>
            {tables}
        </div>
    )
}

export default Random;
