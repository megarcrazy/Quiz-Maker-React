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
            <input type="text" className="fill large-text"
            id={`title`} name={`title`} 
            placeholder="Title" />
        </td>
    </tr>;

    // Tables
    const tables = Array.from(Array(length).keys()).map((number) =>
        <AddTable number={number}/>
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
            <form className="add-input">
                <table className="quiz-table middle">
                    <thead className="thead-light">{newTitle}</thead>
                </table>
                {tables}
            </form>
            <div className="add-space">{confirmButton}</div>
        </div>
    )
}

export default Add;