import React from 'react';
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
    
    // Tables
    const tables = Array.from(Array(data[number - 1]["Questions"].length).keys()).map((number) =>
        <EditTable key={number} number={number} data={data[number]}/>
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
                {tables}
                {confirmButton}
            </form>
        </div>
    )
}

export default Edit;