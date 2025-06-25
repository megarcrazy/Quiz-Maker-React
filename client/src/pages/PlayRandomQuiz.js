import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// Components
import PlayQuizForm from '../components/playQuiz/playQuizForm.js'


const GetNewQuizButton = styled.button`
    font-size: 1.2em;
    color: black;
    background-color: rgb(150, 160, 255);
    padding: 10px 50px 10px 50px;
    border: none;
    border-radius: 5px;
    height: 50px;
    transition: background-color 0.2s ease;
    &:hover,
    &:focus-visible {
        background-color: rgb(100, 112, 180);
        text-decoration: none;
        cursor: pointer;
    }
`;


export default function PlayRandomQuiz() {
    const [quizData, setQuizData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const title = "Random Quiz";
    const message = "The random quiz API was extracted from";

    const fetchRandomQuiz = async () => {
        try {
            document.body.style.cursor = "wait";
            const url = "https://opentdb.com/api.php?amount=10&difficulty=easy";
            const response = await axios.get(url);
            const data = response.data.results;
            setQuizData(data);
            setLoaded(true);
        } catch (err) {
            console.error("Failed to fetch quiz data:", err);
        } finally {
            document.body.style.cursor = "default";
        }
    };

    useEffect(() => {
        fetchRandomQuiz();
    }, []);

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>
                {message} <a href="https://opentdb.com/api_config.php">Open Trivia Database</a>.
            </p>
            <GetNewQuizButton onClick={fetchRandomQuiz}>Give me a new one</GetNewQuizButton>
            {loaded && <PlayQuizForm quizData={quizData} />}
        </div>
    )
};