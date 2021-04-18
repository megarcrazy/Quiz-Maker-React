import React, { useState } from 'react';
// Components

function EditTable({questionNumber, data}) {

    const [questionTitle, setQuestionTitle] = useState(data["Questions"][questionNumber]);
    const [choices, setChoices] = useState(
        {
            "a": data["Choices"]["a"][questionNumber],
            "b": data["Choices"]["b"][questionNumber],
            "c": data["Choices"]["c"][questionNumber],
            "d": data["Choices"]["d"][questionNumber]
        }
    );

    const handleQuestionChange = (e) => {
        setQuestionTitle(e.target.value);
    }
    
    const handleChoiceChange = (e) => {
        setChoices({
            ...choices,
            [e.target.name]: e.target.value
        });
    }

    const question = 
    <tr>
        <td>
            <div className="fill">
                <div className="table-row-key">{questionNumber + 1}.</div> 
                <div className="fill">
                    <input type="text" className="fill large-text"
                    id={`${questionNumber}question`} name={`${questionNumber}question`} 
                    value={questionTitle}
                    onChange={(e) => {handleQuestionChange(e)}} 
                    required/>
                </div>
            </div>
        </td>
    </tr>
    
    const tableChoices = ["a", "b", "c", "d"].map((key) => 
        <tr key={key}>
            <td>
                <div className="fill">
                    <div className="table-row-key">{key}.</div> 
                    <div className="fill">
                        <input type="text" className="inline fill"
                        id={`question${questionNumber}${key}`} 
                        name={key} 
                        value={choices[key]}
                        onChange={(e) => {handleChoiceChange(e)}} 
                        required/>
                    </div>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="add-input">
            <table key={questionNumber} className="quiz-table middle">
                <thead className="thead-light">{question}</thead>
                <tbody>{tableChoices}</tbody>
            </table>
        </div>
    )
}

export default EditTable;
