import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Components
import EditTitle from './editTitle.js';
import EditQuizTable from './editQuizTable';
import ChangeQuizSizeButtons from './changeQuizSizeButtons';
import ConfirmEditButton from './confirmEditButton';
import { API_URL } from '../../apiConfig'

export default function EditQuizForm({ quizID = -1, quizData = null }) {
    const navigate = useNavigate();

    // Dictionary template for question
    const newQuizQuestion = [
        {
            question_text: "",
            answer_list: [
                {
                    answer_text: "",
                    is_correct: true
                },
                {
                    answer_text: "",
                    is_correct: false
                }
            ]
        }
    ]

    const _quizData = quizData || {
        title_text: "",
        question_list: structuredClone(newQuizQuestion)
    };

    const [newQuizData, setNewQuizData] = useState(_quizData);

    // Request user confirmation and upload the quiz dictionary to the server
    const submitQuiz = async (event) => {
        event.preventDefault();
        if (!window.confirm("Are you sure?")) return;

        try {
            document.body.style.cursor = "wait";
            const url = quizID === -1
                ? `${API_URL}/add-quiz`
                : `${API_URL}/update-quiz/${quizID}`;

            await axios({
                method: quizID === -1 ? "post" : "put",
                url: url,
                data: newQuizData,
            });

            alert("Quiz submitted successfully!");
            if (quizID === -1) {
                navigate("/my-quizzes");
            }

        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
        } finally {
            document.body.style.cursor = "default";
        }
    };

    // Increase number of questions
    const increaseSize = (questionIndex) => {
        const updatedQuiz = { ...newQuizData };

        // Create a new empty question
        const newQuestion = {
            question_text: "",
            answer_list: [
                { answer_text: "", is_correct: false },
                { answer_text: "", is_correct: false }
            ]
        };

        // Insert the new question after the specified index
        updatedQuiz.question_list = [
            ...updatedQuiz.question_list.slice(0, questionIndex + 1),
            newQuestion,
            ...updatedQuiz.question_list.slice(questionIndex + 1)
        ];

        setNewQuizData(updatedQuiz);
    };

    // Decrease number of questions
    const decreaseSize = (questionIndex) => {
        const updatedQuiz = { ...newQuizData };
        if (updatedQuiz.question_list.length > 1) {
            updatedQuiz.question_list = updatedQuiz.question_list.filter(
                (_, index) => index !== questionIndex
            );
            setNewQuizData(updatedQuiz);
        } else {
            alert("Cannot remove the last question.");
        }
    };

    const updateQuiz = (questionIndex, questionData) => {
        const updatedQuiz = { ...newQuizData };
        updatedQuiz.question_list[questionIndex] = {
            ...updatedQuiz.question_list[questionIndex],
            ...questionData
        };
        setNewQuizData(updatedQuiz);
    };

    const tables = newQuizData.question_list.map((question, index) => {
        return (
            <div key={index}>
                <EditQuizTable
                    questionNumber={index}
                    questionData={question}
                    updateQuiz={updateQuiz}
                />
                <ChangeQuizSizeButtons
                    questionNumber={index}
                    increaseSize={increaseSize}
                    decreaseSize={decreaseSize}
                />
            </div>
        )
    });

    return (
        <form onSubmit={submitQuiz}>
            <ConfirmEditButton />
            <EditTitle
                title={newQuizData.title_text}
                onChange={(event) => setNewQuizData({
                    ...newQuizData,
                    "title_text": event.target.value
                })}
            />
            {tables}
        </form>
    )
};