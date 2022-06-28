import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Components
import EditQuizForm from '../components/editQuiz/editQuizForm.js';


export default function EditSavedQuiz() {
    const { quizNumber } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("Press confirm after completing the edit.");
    const [quizData, setQuizData] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await axios("http://localhost:3001/data/" + quizNumber);
            const data = response.data;
            if (data === "Not found") {
                setMessage("Invalid url parameters.");
            } else {
                setQuizData(data);
                setLoaded(true);
            }
        }
        fetchData();
    }, [quizNumber]);

    return (
        <div className="content">
            <p>{message}</p>
            {loaded && <EditQuizForm quizData={quizData} quizNumber={quizNumber}/>}
        </div>
    )
}
