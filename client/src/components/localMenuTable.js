import React from 'react';
// Components
import TableButton from './tableButton.js';

function DisplayTable({questionNumber, data}) {
    const question = 
    <tr>
        <td>
            {`${questionNumber + 1}. ${data["title"]}`}
        </td>
    </tr>

    const questionNumberOfQuestions = 
    <tr>
        <td>
            {`Number of questions: ${data["results"].length}`}
        </td>
    </tr>

    // Table Action Buttons
    const tableButtons = 
    <tr>
        <td>
            <div className="middle">
                <TableButton tableButtonType={`Play`} questionNumber={questionNumber}/>
                <TableButton tableButtonType={`Edit`} questionNumber={questionNumber}/>
                <TableButton tableButtonType={`Delete`} questionNumber={questionNumber}/>
            </div>
        </td>
    </tr>

    return (
        <table key={questionNumber} className="quiz-table middle">
            <thead className="thead-light">{question}</thead>
            <tbody>{questionNumberOfQuestions}</tbody>
            <tbody>{tableButtons}</tbody>
        </table>
    )
}

export default DisplayTable;