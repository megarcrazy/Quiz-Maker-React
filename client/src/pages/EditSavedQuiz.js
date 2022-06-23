import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Components
import PageEdit from '../components/pageEdit.js'


function EditSavedQuiz() {
    const { quizNumber } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("Press confirm after completing the edit.");
    const [quizData, setQuizData] = useState("");
    const pageEdit = <PageEdit quizData={quizData} quizNumber={quizNumber}/>;

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
            {loaded && pageEdit}
        </div>
    )
}

export default EditSavedQuiz;