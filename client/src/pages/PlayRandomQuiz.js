import React, { useState, useRef, useEffect } from 'react';
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
    const [error, setError] = useState(false);
    const hasFetched = useRef(false);
    const title = "Random Quiz";
    const message = "The random quiz API was extracted from";

    const fetchRandomQuiz = async () => {
        try {
            document.body.style.cursor = "wait";
            const api = "http://localhost:8000/create-random-quiz";
            const response = await axios.post(api);
            const data = response.data;
            setQuizData(data);
            setError(false);
            setLoaded(true);
        } catch (err) {
            console.log(err);
            setError(true);
            setLoaded(false);
        } finally {
            document.body.style.cursor = "default";
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchRandomQuiz();
    }, []);

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>
                {message} <a href="https://opentdb.com/api_config.php">Open Trivia Database</a>.
            </p>
            <GetNewQuizButton onClick={fetchRandomQuiz}>Give me a new one</GetNewQuizButton>
            {error && <p style={{ color: "red", marginTop: "1em" }}>Failed to load, please try again.</p>}
            {loaded && !error && <PlayQuizForm quizData={quizData} />}
        </div>
    )
};