import React from 'react';
// Components
import DisplayTable from '../components/Quiz/displayTable.js';
// Styles
import '../components/css/quiz.css';
// Data
import data from '../local/quizData.json';

function Quiz() {

    const title = "Your Quizzes";
    const message = "";
    const tables = [...Array(data.length).keys()].map((questionNumber) =>
        <DisplayTable key={questionNumber} questionNumber={questionNumber} 
        data={data[questionNumber]}/>
    );

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            {tables}
        </div>
    )
}

export default Quiz;