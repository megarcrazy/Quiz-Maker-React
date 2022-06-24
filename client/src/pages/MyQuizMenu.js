import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
// Components
import RestartDatabaseButton from '../components/myQuizMenu/restartDatabaseButton.js'
import MyQuizMenuTable from '../components/myQuizMenu/myQuizMenuTable.js';
import AddNewQuizButton from '../components/myQuizMenu/addNewQuizButton.js';


export default function MyQuizMenu() {
    const history = useHistory();
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

    const tables = quizData.map((quiz, index) => {
        return (
            <MyQuizMenuTable key={index} quizNumber={index + 1} data={quiz}/>
        )
    });
    
    return (
        <div className="content">  
            <h1>Your Quizzes</h1>
            <AddNewQuizButton onClick={addQuiz}/>
            {tables}
            <RestartDatabaseButton />
        </div>
    )
}
