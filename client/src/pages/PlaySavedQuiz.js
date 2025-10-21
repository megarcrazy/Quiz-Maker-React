import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
// Components
import PlayQuizForm from '../components/playQuiz/playQuizForm'


export default function PlaySavedQuiz() {
    const { quizNumber } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const [quizData, setQuizData] = useState({});

    // Grab data from relevant quiz and checks if it exists
    useEffect(() => {
        async function fetchData() {
            const response = await axios("http://localhost:8000/get-quiz-questions/" + quizNumber);
            const data = response.data;
            if (data === "Not found") {
                setMessage("Failed to find quiz.");
            } else {
                setMessage("Please click the submit button after completing the quiz.");
                setQuizData(data);
                setLoaded(true);
            }
        }
        fetchData();
    }, [quizNumber]);

    return (
        <div className="content">
            <p>{message}</p>
            {loaded && <PlayQuizForm quizData={quizData} />}
        </div>
    )
}
