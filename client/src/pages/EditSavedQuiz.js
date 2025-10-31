import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Components
import EditQuizForm from '../components/editQuiz/editQuizForm';
import { API_URL } from '../apiConfig';

export default function EditSavedQuiz() {
    const { quizNumber } = useParams();
    const [quizData, setQuizData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuizData = async () => {
            const url = `${API_URL}/get-full-quiz/${quizNumber}`;
            try {
                document.body.style.cursor = "wait";
                const { data } = await axios.get(url);
                setQuizData(data);
            } catch (err) {
                console.error("Failed to fetch quiz data:", err);
            } finally {
                document.body.style.cursor = "default";
                setIsLoading(false);
            }
        };

        fetchQuizData();
    }, [quizNumber]);

    if (isLoading) {
        return <p>Loading quiz...</p>;
    }

    if (!quizData) {
        return <p>Quiz data not found.</p>;
    }

    return (
        <div className="content">
            <p>Press confirm after completing the edit.</p>
            <EditQuizForm quizID={quizNumber} quizData={quizData} />
        </div>
    );
}
