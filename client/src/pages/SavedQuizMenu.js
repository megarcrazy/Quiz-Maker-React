import React from 'react';
// Components
import LocalMenuTable from '../components/localMenuTable.js';
// Styles
import '../components/css/quiz.css';
// Data
import data from '../dataBase/quizData.json';

function LocalQuizMenu() {
    const title = "Your Quizzes";
    const message = "";
    const tables = [...Array(data.length).keys()].map((questionNumber) =>
        <LocalMenuTable key={questionNumber} questionNumber={questionNumber} 
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

export default LocalQuizMenu;