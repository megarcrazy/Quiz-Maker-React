import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
// Styles
import '../components/css/edit.css';
// Components
import EditQuizTable from './editQuizTable.js';

function PageEdit({ quizNumber, quizData }) {
    const history = useHistory();
    const [newQuizData, setNewQuizData] = useState(quizData);
    const newQuestion = {
        question: "",
        correct_answer: "",
        incorrect_answers: ["", "", ""],
        correct_index: 0
    };

    const increaseSize = (index) => {
        const newQuiz = [
            ...newQuizData.results.slice(0, index), 
            newQuestion,
            ...newQuizData.results.slice(index, newQuizData.results.length)
        ]
        setNewQuizData({
            title: newQuizData.title,
            results: newQuiz
        });
    }

    const decreaseSize = (index) => {
        if (newQuizData.results.length === 1) {
            window.alert("Quiz cannot be empty.");
        } else if (window.confirm(`Deleting question ${index}. Are you sure?`)) {
            const newQuiz = [
                ...newQuizData.results.slice(0, index - 1), 
                ...newQuizData.results.slice(index, newQuizData.results.length)
            ]
            setNewQuizData({
                title: newQuizData.title,
                results: newQuiz
            });
        }
    }

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

    const titleInput = 
    <tr>
        <td>
            <div className="fill">
                <div className="table-row-key"></div> 
                <div className="fill">
                    <input type="text" className="fill large-text"
                    value={newQuizData.title}
                    onChange={(event) => {handleTitleChange(event)}}
                    required/>
                </div>
            </div>
        </td>
    </tr>;

    const changeSizeButtons = (questionNumber) => {
        return (
            <div className="middle ">
                <button type="button" className="btn change-size-button" 
                onClick={() => increaseSize(questionNumber + 1)}>
                    +
                </button>
                <button type="button" className="btn change-size-button" 
                onClick={() => decreaseSize(questionNumber + 1)}>
                    -
                </button>
            </div>
        )
    }

    const tables = [...Array(newQuizData.results.length).keys()].map((questionNumber) => {
        return (
            <div key={questionNumber}>
                <EditQuizTable 
                questionNumber={questionNumber}
                questionData={newQuizData.results[questionNumber]}
                updateQuiz={updateQuiz}
                />
                {changeSizeButtons(questionNumber)}
            </div>
        )
    });

    const submitButton = 
    <button className="btn btn-secondary middle submit-button" 
    id="submit-button">
        Confirm
    </button>

    const submitQuiz = (event) => {
        event.preventDefault();
        if (window.confirm("Are you sure?")) {
            axios.post("http://localhost:3001/edit/" + quizNumber, {
                quizData: newQuizData
            });
            history.push("/quiz");
        }
    }

    return (
        <form className="add-input" onSubmit={submitQuiz}>
            <table className="quiz-table middle">
                <thead className="thead-light">{titleInput}</thead>
            </table>
            {tables}
            <br />
            {submitButton}
        </form>
    )
};

export default PageEdit;