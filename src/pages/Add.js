import React from 'react';
// Components
import AddTable from '../components/Add/addTable';
// Styles
import '../components/css/edit.css';

function Add() {
    const title = "Add";
    const message = "Please include a title and confirm after finishing the new quiz."
    let length = 3;

    // Title 
    const newTitle = 
    <tr>
        <td>
            <div className="fill">
                <div className="table-row-key"></div> 
                <div className="fill">
                    <input type="text" className="fill large-text"
                    id={`title`} name={`title`} 
                    placeholder="Title" />
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
    <a className="no-underline" href="/quiz">
        <button className="btn btn-secondary my-button-style middle">
            Confirm
        </button>
    </a>

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            <div className="add-input">
                <table className="quiz-table middle">
                    <thead className="thead-light">{newTitle}</thead>
                </table>
                {tables}
            </div>
            <div className="add-space">{confirmButton}</div>
        </div>
    )
}

export default Add;