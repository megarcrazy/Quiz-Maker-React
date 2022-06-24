import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
// Components
import PlayQuizForm from '../components/playQuiz/playQuizForm.js'


export default function PlaySavedQuiz() {
    const { quizNumber } = useParams();
    const [loaded, setLoaded] = useState(false);

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [quizData, setQuizData] = useState("");

    // Grab data from relevant quiz and checks if it exists
    useEffect(() => {
        async function fetchData() {
            const response = await axios("http://localhost:3001/data/" + quizNumber);
            const data = response.data;
            if (data === "Not found") {
                setMessage("Invalid url parameters.");
            } else {
                setTitle(data.title);
                setMessage("Please click the submit button after completing the quiz.");
                setQuizData(data.results);
                setLoaded(true);
            }
        }
        fetchData();
    }, [quizNumber]);

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            {loaded && <PlayQuizForm quizData={quizData}/>}
        </div>
    )
}
