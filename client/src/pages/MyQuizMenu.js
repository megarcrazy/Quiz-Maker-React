import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Components
import MyQuizMenuTable from '../components/myQuizMenu/myQuizMenuTable';
import { API_URL } from '../apiConfig'

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


const WarningMessage = styled.p`
    color: red;
    text-align: center;
`;


export default function MyQuizMenu() {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState([]);
    const [warningMessage, setWarningMessage] = useState("");

    useEffect(() => {
        const fetchQuizTitleData = async () => {
            document.body.style.cursor = "wait";
            try {
                const { data } = await axios.get(`${API_URL}/get-quiz-list`);
                const quizList = data.quiz_list ?? [];
                setQuizData(quizList);
                setWarningMessage(
                    quizList.length === 0 ? "Warning: No quizzes found." : ""
                );
            } catch (error) {
                console.error("Failed to fetch quiz data:", error);
                setWarningMessage("Error: Failed to load quizzes.");
            } finally {
                document.body.style.cursor = "default";
            }
        };

        fetchQuizTitleData();
    }, []);

    const addQuiz = () => {
        navigate("/my-quizzes/add");
    }

    const tables = quizData.map(({ quiz_id, title_text }, index) => (
        <MyQuizMenuTable key={index} quizID={quiz_id} title={title_text} />
    ));

    return (
        <div className="content">
            <h1>Your Quizzes</h1>
            <ButtonsWrapper>
                <AddNewQuizButton onClick={addQuiz}>
                    Add new quiz
                </AddNewQuizButton>
            </ButtonsWrapper>
            {tables}
            <WarningMessage>
                {warningMessage}
            </WarningMessage>
        </div >
    )
};