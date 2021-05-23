import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
// Components
import LocalMenuTable from '../components/localMenuTable.js';
// Styles
import '../components/css/quiz.css';

function LocalQuizMenu() {
    let history = useHistory();

    const title = "Your Quizzes";
    const message = "";
    const [quizData, setQuizData] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await axios("http://localhost:3001/data");
            setQuizData(response.data);
        }
        fetchData();
    }, []);

    const addQuiz = () => {
        history.push("quiz/add");
    }

    const addButton = 
    <button className="add-button middle" onClick={addQuiz}>
        Add New Quiz
    </button>

    const tables = [...Array(quizData.length).keys()].map((index) => {
        const quizNumber = index + 1;
        return (
            <LocalMenuTable key={quizNumber} quizNumber={quizNumber} 
            data={quizData[quizNumber - 1]}/>
        )
    });
    
    return (
        <div className="content">  
            <h1>{title}</h1>
            {addButton}
            <p>{message}</p>
            {tables}
        </div>
    )
}

export default LocalQuizMenu;