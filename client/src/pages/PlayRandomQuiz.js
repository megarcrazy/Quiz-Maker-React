import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Components
import PlayQuizForm from '../components/playQuiz/playQuizForm.js'


export default function PlayRandomQuiz() {
    const [quizData, setQuizData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const title = "Random Quiz";
    const message = "The random quiz API was extracted from";

    useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=10&difficulty=easy")
        .then(response => { 
            setQuizData(response.data.results) 
            setLoaded(true);
        })
        .catch(error => { console.error(error) });   
    }, []);

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>
                {message} <a href="https://opentdb.com/api_config.php">Open Trivia Database</a>.
            </p>
            {loaded && <PlayQuizForm quizData={quizData}/>}
        </div>
    )
}

