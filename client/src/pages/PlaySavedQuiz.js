import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// Components
import PageQuiz from '../components/pageQuiz.js'
// Styles
import '../components/css/quiz.css';
// Data
import data from '../dataBase/quizData.json';

function PlaySavedQuiz() {
    const { quizNumber } = useParams();
    const [loaded, setLoaded] = useState(false);

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("Invalid url parameter. Please check if the url is valid.");
    const [quizData, setQuizData] = useState("");
    const [webQuiz, setWebQuiz] = useState("");

    useEffect(() => {
        if (quizNumber >= 1 && quizNumber <=  data.length) {
            setTitle(data[quizNumber - 1]["title"]);
            setMessage("Please click submit after the completion of the quiz.");
            setQuizData(data[quizNumber - 1]["results"]);
            setWebQuiz(<PageQuiz quizData={quizData}/>);
        }
        
        setLoaded(true);
    }, [quizNumber, quizData]);

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            {loaded && webQuiz}
        </div>
    )
}

export default PlaySavedQuiz;