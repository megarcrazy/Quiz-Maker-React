import React from 'react';
// Components
import EditQuizForm from '../components/editQuiz/editQuizForm';


export default function AddNewQuiz() {
    const newQuizDataTemplate = {
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
            <h1>Add New Quiz</h1>
            <p>Click confirm when you are done.</p>
            <EditQuizForm quizID={-1} quizData={newQuizDataTemplate} />
        </div>
    )
};