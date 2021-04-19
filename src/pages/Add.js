import React from 'react';
import { useHistory } from "react-router";
// Components
import AddTable from '../components/Add/addTable';
// Styles
import '../components/css/edit.css';

function Add() {
    const title = "Add";
    const message = "Please include a title and confirm after finishing the new quiz."
    let length = 1;
    const history = useHistory();

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
        for (let i = 0; i < length; i++) {
            jsonData["Questions"].push(storedFormData[`question${i}`]);
            jsonData["Choices"]["a"].push(storedFormData[`question${i}a`]);
            jsonData["Choices"]["b"].push(storedFormData[`question${i}b`]);
            jsonData["Choices"]["c"].push(storedFormData[`question${i}c`]);
            jsonData["Choices"]["d"].push(storedFormData[`question${i}d`]);
            jsonData["Answers"].push(storedFormData[`answer${i}`]);
        }
        console.log(JSON.stringify(jsonData));
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
                    id="title" name="title"
                    placeholder="Title" required/>
                </div>
            </div>
        </td>
    </tr>;

    // Tables
    const tables = [...Array(length).keys()].map((questionNumber) =>
        <AddTable key={questionNumber} questionNumber={questionNumber}/>
    );

    // Confirm Button
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
                <div className="add-space">{confirmButton}</div>
            </form>
        </div>
    )
}

export default Add;