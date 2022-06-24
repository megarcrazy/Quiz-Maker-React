import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
// Components
import RestartDatabaseButton from '../components/restartDatabaseButton.js'
import LocalMenuTable from '../components/localMenuTable.js';


const AddNewQuizButton = styled.button`
    font-size: 1.4em;
    color: white;
    background-color: rgb(100, 100, 100);
    padding: 10px 50px 10px 50px;
    display: table;
    margin-left: auto;
    margin-right: auto;

    &:hover {    
        background-color: rgb(53, 53, 53);
        text-decoration: none;
    }
`;


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

    const tables = quizData.map((quiz, index) => {
        return (
            <LocalMenuTable key={index} quizNumber={index + 1} data={quiz}/>
        )
    });
    
    return (
        <div className="content">  
            <h1>{title}</h1>
            <AddNewQuizButton onClick={addQuiz}>
                Add New Quiz
            </AddNewQuizButton>
            {tables}
            <RestartDatabaseButton />
        </div>
    )
}

export default LocalQuizMenu;