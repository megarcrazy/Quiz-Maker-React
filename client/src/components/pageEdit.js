import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
// Styles
import '../components/css/edit.css';
// Components
import EditQuizTable from './editQuizTable.js';

function PageEdit({ quizNumber, quizData }) {
    let history = useHistory();
    const [newQuizData, setNewQuizData] = useState(quizData);
    const newQuestion = {question: "", correct_answer: "", incorrect_answers: ["", "", ""]};

    const increaseSize = (index) => {
        setNewQuizData({
            ...newQuizData,
            results: [
                ...newQuizData.results.slice(0, index), 
                newQuestion,
                ...newQuizData.results.slice(index + 1, newQuizData.length)
            ]
        });
    }

    const decreaseSize = (index) => {
        window.confirm(`Deleting question ${index}. Are you sure?`) &&
        setNewQuizData({
            ...newQuizData,
            results: [
                ...newQuizData.results.slice(0, index - 1), 
                ...newQuizData.results.slice(index + 1, newQuizData.length)
            ]
        });
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

    const tables = [...Array(newQuizData.results.length).keys()].map((questionNumber) => {
        return <EditQuizTable 
        key={questionNumber}
        questionNumber={questionNumber}
        questionData={newQuizData.results[questionNumber]}
        updateQuiz={updateQuiz}
        />
    });

    const submitQuiz = (event) => {
        event.preventDefault();
        if (window.confirm("Are you sure?")) {
            axios.post("http://localhost:3001/edit/" + quizNumber, {
                quizData: newQuizData
            });
            history.push("/quiz");
        }
    }

    const changeSizeButtons = 
    <div className="middle ">
        <button type="button" className="btn change-size-button" 
        onClick={() => increaseSize(newQuizData.results.length)}>
            +
        </button>
        <button type="button" className="btn change-size-button" 
        onClick={() => decreaseSize(newQuizData.results.length)}>
            -
        </button>
    </div>

    const submitButton = 
    <button className="btn btn-secondary middle submit-button" 
    id="submit-button">
        Confirm
    </button>

    return (
        <form className="add-input" onSubmit={submitQuiz}>
            <table className="quiz-table middle">
                <thead className="thead-light">{titleInput}</thead>
            </table>
            {tables}
            {changeSizeButtons}
            {submitButton}
        </form>
    )
};

export default PageEdit;