import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
// Components
import RestartButton from '../components/restartButton.js'
import LocalMenuTable from '../components/localMenuTable.js';
// Styles
import '../components/css/quiz.css';

function LocalQuizMenu() {
    const history = useHistory();
    const title = "Your Quizzes";
    const [quizData, setQuizData] = useState([]);

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

    const tables = quizData.map((quiz, index) => {
        return (
            <LocalMenuTable key={index} quizNumber={index + 1} data={quiz}/>
        )
    });
    
    return (
        <div className="content">  
            <h1>{title}</h1>
            <RestartButton />
            {addButton}
            {tables}
        </div>
    )
}

export default LocalQuizMenu;