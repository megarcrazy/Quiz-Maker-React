import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Components
import EditTitle from './editTitle.js';
import EditQuizTable from './editQuizTable.js';
import ChangeQuizSizeButtons from './changeQuizSizeButtons';
import ConfirmEditButton from './confirmEditButton.js';


export default function EditQuizForm({ quizNumber, quizData }) {
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

    // Request user confirmation and upload the editted quiz dictionary to the server
    const submitQuiz = (event) => {
        event.preventDefault();
        const confirm = window.confirm("Are you sure?");
        if (confirm) {
            // Quiz number 0 to append new quiz to existing list of quizzes
            try {
                document.body.style.cursor = "wait";
                const url = "http://localhost:8000/edit/" + quizNumber
                axios.post(url, { quizData: newQuizData });
            } catch {
                window.alert("Failed to save quiz because of unknown error.");
            } finally {
                document.body.style.cursor = "default";
            }
            navigate("/my-quizzes");
        }
    }

    return (
        <form onSubmit={submitQuiz}>
            <EditTitle title={newQuizData.title} onClick={handleTitleChange} />
            <ConfirmEditButton />
            {tables}
        </form>
    )
};