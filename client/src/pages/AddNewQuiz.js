import React from 'react';
// Components
import EditQuizForm from '../components/editQuiz/editQuizForm';


export default function AddNewQuiz() {
    return (
        <div className="content">
            <h1>Add New Quiz</h1>
            <p>Click confirm when you are done.</p>
            <EditQuizForm />
        </div>
    )
};