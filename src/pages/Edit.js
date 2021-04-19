import React, { useState } from 'react';
import { useHistory } from "react-router";
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
    const history = useHistory();

    const [currentQuizTitle, setCurrentQuizTitle] = useState(currentQuizData["Title"]);
    
    const handleTitleChange = (e) => {
        setCurrentQuizTitle(e.target.value );
    }

    const storeData = (e) => {
        
        const formData = new FormData(e.target);
        let storedFormData = {};
        for (let [key, value] of formData.entries()) {
            storedFormData[key] = value;
        }
        let jsonData = {
            "Title": storedFormData["title"],
            "Questions": [],
            "Choices": {a: [], b: [], c: [], d: []},
            "Answers": []
        };
        for (let i = 0; i < quizLength; i++) {
            jsonData["Questions"].push(storedFormData[`question${i}`]);
            jsonData["Choices"]["a"].push(storedFormData[`question${i}a`]);
            jsonData["Choices"]["b"].push(storedFormData[`question${i}b`]);
            jsonData["Choices"]["c"].push(storedFormData[`question${i}c`]);
            jsonData["Choices"]["d"].push(storedFormData[`question${i}d`]);
            jsonData["Answers"].push(storedFormData[`answer${i}`]);
        }
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        storeData(e);
        history.push({
            pathname: "/quiz"
        })
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
    <button className="btn btn-secondary my-button-style middle">
        Confirm
    </button>
    
    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            <form className="add-input" onSubmit={onSubmit}>
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