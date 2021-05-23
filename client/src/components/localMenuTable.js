import React from 'react';
// Components
import TableButton from './tableButton.js';

function LocalMenuTable({data, quizNumber}) {
    const question = 
    <tr>
        <td>
            {`${quizNumber}. ${data.title}`}
        </td>
    </tr>

    const questionNumberOfQuestions = 
    <tr>
        <td>
            {`Number of questions: ${data.results.length}`}
        </td>
    </tr>

    // Table Action Buttons
    const tableButtons = 
    <tr>
        <td>
            <div className="middle">
                <TableButton tableButtonType={`Play`} quizNumber={quizNumber}/>
                <TableButton tableButtonType={`Edit`} quizNumber={quizNumber}/>
                <TableButton tableButtonType={`Delete`} quizNumber={quizNumber}/>
            </div>
        </td>
    </tr>

    return (
        <table key={quizNumber} className="quiz-table middle">
            <thead className="thead-light">{question}</thead>
            <tbody>{questionNumberOfQuestions}</tbody>
            <tbody>{tableButtons}</tbody>
        </table>
    )
}

export default LocalMenuTable;