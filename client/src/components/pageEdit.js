import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
// Components
import EditQuizTable from './editQuizTable.js';

function PageEdit({ quizNumber, quizData }) {
    let history = useHistory();
    const [newQuizData, setNewQuizData] = useState(quizData);

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

    const tables = [...Array(quizData.results.length).keys()].map((questionNumber) => {
        return <EditQuizTable 
        key={questionNumber}
        questionNumber={questionNumber}
        questionData={quizData.results[questionNumber]}
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

    const submitButton = 
    <button className="btn btn-secondary my-button-style middle" 
    id="submit-button">
        Confirm
    </button>

    return (
        <form className="add-input" onSubmit={submitQuiz}>
            <table className="quiz-table middle">
                <thead className="thead-light">{titleInput}</thead>
            </table>
            {tables}
            <br />
            {submitButton}
            <br />
            <br />
        </form>
    )
};

export default PageEdit;