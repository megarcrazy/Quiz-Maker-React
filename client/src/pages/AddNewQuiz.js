import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Components
import EditQuizForm from '../components/editQuiz/editQuizForm';


export default function AddNewQuiz() {
    const title = "Add New Quiz";
    const message = "Click confirm when you are done.";
    const [quizNumber, setQuizNumber] = useState(0);

    useEffect(() => {
        (async function () {
            const responseLength = await axios("http://localhost:3001/databaseLength");
            const length = responseLength.data;
            setQuizNumber(length + 1);
        })();
    }, []);

    const newQuizData = {
        title: "",
        results: [
            {
            question: "",
            correct_answer: "",
            incorrect_answers: ["", "", ""],
            correct_index: 0
            }
        ]
    };

    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            <EditQuizForm quizData={newQuizData} quizNumber={quizNumber}/>
        </div>
    )
}
