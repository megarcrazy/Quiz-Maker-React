import React, { useState } from 'react';
import { useParams } from "react-router-dom";
// Components
import EditTable from '../components/Edit/editTable.js';
// Styles
import '../components/css/edit.css';
// Data
import data from '../local/quizData.json';

function Edit() {
    
    const title = "Edit";
    const message = "Please confirm after finishing your edit."

    const { number } = useParams();
    const currentQuizData = data[number - 1];
    const quizLength = currentQuizData["Questions"].length;

    const [currentQuizTitle, setCurrentQuizTitle] = useState(currentQuizData["Title"]);

    const handleTitleChange = (e) => {
        setCurrentQuizTitle(e.target.value );
    }

    // Title 
    const newTitle = 
    <tr>
        <td>
            <div className="fill">
                <div className="table-row-key"></div> 
                <div className="fill">
                    <input type="text" className="fill large-text"
                    id={`title`} name={`title`} 
                    value={currentQuizTitle}
                    onChange={(e) => {handleTitleChange(e)}}
                    required/>
                </div>
            </div>
        </td>
    </tr>;

    // Tables
    const tables = [...Array(quizLength).keys()].map((questionNumber) =>
        <EditTable key={questionNumber} questionNumber={questionNumber} 
        data={data[questionNumber]}/>
    );

    // Confirm button
    const confirmButton =
    <a className="no-underline" href="/quiz">
        <button className="btn btn-secondary my-button-style middle">
            Confirm
        </button>
    </a>
    
    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            <form className="add-input">
                <table className="quiz-table middle">
                    <thead className="thead-light">{newTitle}</thead>
                </table>
                {tables}
                {confirmButton}
            </form>
        </div>
    )
}

export default Edit;