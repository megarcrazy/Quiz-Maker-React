import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Components
import LocalMenuTable from '../components/localMenuTable.js';
// Styles
import '../components/css/quiz.css';

function LocalQuizMenu() {
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

    const tables = [...Array(quizData.length).keys()].map((index) => {
        let quizNumber = index + 1;
        return (
            <LocalMenuTable key={quizNumber} quizNumber={quizNumber} 
            data={quizData[quizNumber - 1]}/>
        )
    });
    
    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            {tables}
        </div>
    )
}

export default LocalQuizMenu;