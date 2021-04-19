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
                    id={`question${questionNumber}`} name={`question${questionNumber}`} 
                    placeholder="Question" required />
                </div>
            </div>
        </td>
    </tr>

    // Questions
    const choices = ["a", "b", "c", "d"].map((key) => 
        <tr key={key}>
            <td>
                <div className="fill">
                    <div className="table-row-key">{`${key}.`}</div> 
                    <div className="fill">
                        <input type="text" className="fill"
                        id={`question${questionNumber}${key}`}
                        name={`question${questionNumber}${key}`} 
                        required />
                    </div>
                </div>
            </td>
        </tr>
    );

    // Choices
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
        <table key={questionNumber} className="quiz-table middle">
            <thead className="thead-light">{title}</thead>
            <tbody>{choices}</tbody>
            <tbody>{answers}</tbody>
        </table>
    )
}

export default AddTable;
