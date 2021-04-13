import React from 'react';
// Components
import AddButton from '../components/Quiz/addButton.js';
import DisplayTable from '../components/Quiz/displayTable.js';
// Styles
import '../components/css/quiz.css';
// Data
import data from '../local/quizData.json';

function Quiz() {
    const title = "Your Quizzes";
    const message = "Edit or add a new quiz.";
    const tables = Array.from(Array(data.length).keys()).map((number) =>
        <DisplayTable key={number} number={number} data={data[number]}/>
    );

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            <AddButton />
            {tables}
        </div>
    )
}

export default Quiz;