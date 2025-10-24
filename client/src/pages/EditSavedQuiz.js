import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Components
import EditQuizForm from '../components/editQuiz/editQuizForm';
import { API_URL } from '../apiConfig'

export default function EditSavedQuiz() {
    const { quizNumber } = useParams();
    const [quizData, setQuizData] = useState("");

    const fetchQuizData = async (quizNumber) => {
        const url = `${API_URL}/data/${quizNumber}`;
        try {
            document.body.style.cursor = "wait";
            const { data } = await axios.get(url);
            setQuizData(data);
        } catch (err) {
            console.error("Failed to fetch quiz data:", err);
        } finally {
            document.body.style.cursor = "default";
        }
    };

    useEffect(() => {
        fetchQuizData(quizNumber);
    }, [quizNumber]);

    return (
        <div className="content">
            <p>Press confirm after completing the edit.</p>
            <EditQuizForm quizData={quizData} quizNumber={quizNumber} />
        </div>
    )
}
