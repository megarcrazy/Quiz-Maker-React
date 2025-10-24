import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Components
import EditTitle from './editTitle.js';
import EditQuizTable from './editQuizTable.js';
import ChangeQuizSizeButtons from './changeQuizSizeButtons';
import ConfirmEditButton from './confirmEditButton';
import { API_URL } from '../../apiConfig'

export default function EditQuizForm({ quizID, quizData }) {
    const navigate = useNavigate();
    const [newQuizData, setNewQuizData] = useState(quizData);

    // Dictionary template for question in the database
    const newQuestion = {
        question: "",
        correct_answer: "",
        incorrect_answers: ["", "", ""],
        correct_index: 0
    };

    // Add new question at the location of the button
    const increaseSize = (index) => {
        const newQuiz = [
            ...newQuizData.results.slice(0, index + 1),
            newQuestion,
            ...newQuizData.results.slice(index + 1, newQuizData.results.length)
        ]
        setNewQuizData({
            title: newQuizData.title,
            results: newQuiz
        });
    }

    // Remove question above the button
    const decreaseSize = (index) => {
        if (newQuizData.results.length === 1) {
            window.alert("Quiz cannot be empty.");
        } else if (window.confirm(`Deleting question ${index + 1}. Are you sure?`)) {
            const newQuiz = [
                ...newQuizData.results.slice(0, index),
                ...newQuizData.results.slice(index + 1, newQuizData.results.length)
            ]
            setNewQuizData({
                title: newQuizData.title,
                results: newQuiz
            });
        }
    }

    // Update the quiz after changing a state in the child component
    const updateQuiz = (newData, questionNumber) => {
        setNewQuizData({
            ...newQuizData,
            results: Object.values({
                ...newQuizData.results,
                [questionNumber]: newData
            })
        });
    }

    const handleTitleChange = (event) => {
        setNewQuizData({
            ...newQuizData,
            title: event.target.value
        });
    }

    const tables = [...Array(newQuizData.results.length).keys()].map((questionNumber) => {
        return (
            <div key={questionNumber}>
                <EditQuizTable
                    questionNumber={questionNumber}
                    questionData={newQuizData.results[questionNumber]}
                    updateQuiz={updateQuiz}
                />
                <ChangeQuizSizeButtons
                    questionNumber={questionNumber}
                    increaseSize={increaseSize}
                    decreaseSize={decreaseSize}
                />
            </div>
        )
    });

    // Request user confirmation and upload the quiz dictionary to the server
    const submitQuiz = (event) => {
        event.preventDefault();
        if (!window.confirm("Are you sure?")) return;

        document.body.style.cursor = "wait";

        const url = quizID === -1
            ? `${API_URL}/add_quiz`
            : `${API_URL}/update-quiz/${quizID}`;

        try {
            axios.post(url, { quizData: newQuizData });
            navigate("/my-quizzes");
        } catch {
            window.alert("Failed to save quiz because of unknown error.");
        } finally {
            document.body.style.cursor = "default";
        }
    };

    return (
        <form onSubmit={submitQuiz}>
            <EditTitle title={newQuizData.title} onClick={handleTitleChange} />
            <ConfirmEditButton />
            {tables}
        </form>
    )
};