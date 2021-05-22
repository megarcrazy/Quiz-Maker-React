import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
// Components
import PageEdit from '../components/pageEdit.js'
// Styles
import '../components/css/quiz.css';
import '../components/css/edit.css';

function EditSavedQuiz() {
    const { quizNumber } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("This page is WIP.");
    const [quizData, setQuizData] = useState("");
    const pageEdit = <PageEdit quizData={quizData}/>;

    useEffect(() => {
        async function fetchData() {
            const response = await axios("http://localhost:3001/data/" + quizNumber);
            const data = response.data;
            if (data === "Not found") {
                setMessage("Invalid url parameters.");
            } else {
                setTitle(`Edit: ${data.title}`);
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
            {loaded && pageEdit}
        </div>
    )
}

export default EditSavedQuiz;