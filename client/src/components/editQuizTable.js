import React, { useState } from 'react';
// Styles
import './css/quiz.css';

function EditQuizTable({ questionNumber, question, correctAnswer, incorrectAnswer }) {
    const [newQuestion, setNewQuestion] = useState(question); 
    const [choices, setChoices] = useState([correctAnswer, ...incorrectAnswer]);
    
    const handleQuestionChange = (e) => {
        setNewQuestion(e.target.value);
    }
    
    const handleChoiceChange = (e) => {
        setChoices(Object.values({
            ...choices,
            [e.target.name]: e.target.value
        }));
    }

    const tableQuestion = 
    <tr>
        <td>
            <div className="fill">
                <div className="table-row-key">
                    {questionNumber + 1}.
                </div> 
                <div className="fill">
                    <input type="text" className="inline fill"
                    value={HTMLDecode(newQuestion)}
                    onChange={(e) => {handleQuestionChange(e)}} 
                    required/>
                </div>
            </div>
        </td>
    </tr>

    const tableChoices = choices.map((choice, index) => 
        <tr key={index}>
            <td>
                <div className="fill">
                    <div className="table-row-key">
                        {String.fromCharCode(index + "a".charCodeAt())}.
                    </div> 
                    <div className="fill">
                        <input type="text" className="inline fill"
                        value={HTMLDecode(choice)}
                        name={index}
                        onChange={(e) => {handleChoiceChange(e)}} 
                        required/>
                    </div>
                </div>
            </td>
        </tr>
    );

    return (
        <table className="quiz-table play-table middle">
            <thead className="thead-light">{tableQuestion}</thead>
            <tbody className="quiz-question-body">{tableChoices}</tbody>
        </table>
    )
}

const HTMLDecode = input => {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

export default EditQuizTable;