import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Components
import PageEdit from '../components/pageEdit.js'

function AddNewQuiz() {
    const title = "Add New Quiz";
    const message = "Click confirm when you are done.";
    const [quizNumber, setQuizNumber] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const response = await axios("http://localhost:3001/data/length");
            const length = response.data;
            setQuizNumber(length + 1);
        }
        fetchData();
    }, [quizNumber]);

    const newQuizData = {
        title: "",
		results: [{question: "", correct_answer: "", incorrect_answers: ["", "", ""]}]
    }
    
    const pageEdit = <PageEdit quizData={newQuizData} quizNumber={quizNumber}/>;
    
    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
            {pageEdit}
        </div>
    )
}

export default AddNewQuiz;