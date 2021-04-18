import React from 'react';
// Components

function AddTable({questionNumber}) {
    // Title
    const title = 
    <tr>
        <td>
            <div className="fill">
                <div className="table-row-key">{questionNumber + 1}.</div> 
                <div className="fill">
                    <input type="text" className="fill large-text"
                    id={`${questionNumber}question`} name={`${questionNumber}question`} 
                    placeholder="Question" required />
                </div>
            </div>
        </td>
    </tr>

    // Questions
    const questions = ["a", "b", "c", "d"].map((key) => 
        <tr key={key}>
            <td>
                <div className="fill">
                    <div className="table-row-key">{`${key}.`}</div> 
                    <div className="fill">
                        <input type="text" className="fill"
                        id={`question${questionNumber}${key}`} name={`question${questionNumber}${key}`} 
                        required />
                    </div>
                </div>
            </td>
        </tr>
    );

    // Choices
    const choices = 
    <tr>
        <td>
            <div className="fill">
                <div className="float-left">Answer</div> 
                <div className="middle">
                    <select id={`${questionNumber}answer`} name={`${questionNumber}answer`} >
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
        <table key={questionNumber} className="quiz-table middle">
            <thead className="thead-light">{title}</thead>
            <tbody>{questions}</tbody>
            <tbody>{choices}</tbody>
        </table>
    )
}

export default AddTable;
