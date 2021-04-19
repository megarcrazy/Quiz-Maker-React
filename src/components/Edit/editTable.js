import React, { useState } from 'react';
// Components

function EditTable({questionNumber, data}) {

    const [questionTitle, setQuestionTitle] = useState(data["Questions"][questionNumber]);
    const [choices, setChoices] = useState(
        {
            [`question${questionNumber}a`]: data["Choices"]["a"][questionNumber],
            [`question${questionNumber}b`]: data["Choices"]["b"][questionNumber],
            [`question${questionNumber}c`]: data["Choices"]["c"][questionNumber],
            [`question${questionNumber}d`]: data["Choices"]["d"][questionNumber]
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
                    id={`question${questionNumber}`}
                    name={`question${questionNumber}`} 
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
                        name={`question${questionNumber}${key}`} 
                        value={choices[`question${questionNumber}${key}`]}
                        onChange={(e) => {handleChoiceChange(e)}} 
                        required/>
                    </div>
                </div>
            </td>
        </tr>
    );

    const answers = 
    <tr>
        <td>
            <div className="fill">
                <div className="float-left">Answer</div> 
                <div className="middle">
                    <select id={`answer${questionNumber}`} name={`answer${questionNumber}`} >
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                        <option value="d">d</option>
                    </select>
                </div>
            </div>
        </td>
    </tr>

    return (
        <div className="add-input">
            <table key={questionNumber} className="quiz-table middle">
                <thead className="thead-light">{question}</thead>
                <tbody>{tableChoices}</tbody>
                <tbody>{answers}</tbody>
            </table>
        </div>
    )
}

export default EditTable;
