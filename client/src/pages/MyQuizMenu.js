import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Components
import MyQuizMenuTable from '../components/myQuizMenu/myQuizMenuTable.js';


const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.75rem;
`;

const AddNewQuizButton = styled.button`
    font-size: 1.2em;
    color: black;
    background-color: rgb(150, 255, 150);
    padding: 10px 50px 10px 50px;
    border: none;
    border-radius: 5px;
    height: 50px;
    transition: background-color 0.2s ease;
    &:hover,
    &:focus-visible {
        background-color: rgb(100, 180, 100);
        text-decoration: none;
        cursor: pointer;
    }
`;

const ResetQuizDataButton = styled.button`
    width: 200px;
    height: 50px;
    font-size: 1em;
    background-color: rgb(255, 159, 159);
    border: none;
    border-radius: 5px;
    transition: background-color 0.2s ease;
    &:hover,
    &:focus-visible {
        cursor: pointer;
        background-color: rgb(255, 93, 93);
    }
`;

const WarningMessage = styled.p`
    color: red;
    text-align: center;
`;


export default function MyQuizMenu() {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState([]);
    const [warningMessage, setWarningMessage] = useState("");

    const fetchQuizTitleData = async () => {
        const data = {};
        const url = "http://localhost:3001/data";
        try {
            document.body.style.cursor = "wait";
            const { data } = await axios.get(url);
            setQuizData(data);
        } catch (err) {
            console.error("Failed to fetch quiz data:", err);
        } finally {
            document.body.style.cursor = "default";
        }
        if (Object.keys(data).length === 0) {
            setWarningMessage("Warning: No quizzes found.")
        }
    };

    useEffect(() => {
        fetchQuizTitleData();
    }, []);

    const addQuiz = () => {
        navigate("/my-quizzes/add");
    }

    const resetQuiz = async () => {
        const confirm = window.confirm("Resetting the database. Are you sure?");
        if (confirm) {
            //TODO: await axios.post("http://localhost:3001/restart", {});
            await fetchQuizTitleData();
        }
    }

    const tables = quizData.map((quiz, index) => {
        return (
            <MyQuizMenuTable key={index} quizNumber={index + 1} data={quiz} />
        )
    });

    return (
        <div className="content">
            <h1>Your Quizzes</h1>
            <ButtonsWrapper>
                <AddNewQuizButton onClick={addQuiz}>
                    Add new quiz
                </AddNewQuizButton>
                <ResetQuizDataButton onClick={resetQuiz}>
                    Reset all quizzes
                </ResetQuizDataButton>
            </ButtonsWrapper>
            {tables}
            <WarningMessage>
                {warningMessage}
            </WarningMessage>
        </div >
    )
};