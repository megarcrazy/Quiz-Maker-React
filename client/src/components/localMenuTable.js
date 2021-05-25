import React from 'react';
// Components
import TableButton from './tableButton.js';

function LocalMenuTable({data, quizNumber}) {
    const tableButtons = 
    <tr>
        <td>
            <div className="middle">
                <TableButton tableButtonType="Play" quizNumber={quizNumber}/>
                <TableButton tableButtonType="Edit" quizNumber={quizNumber}/>
                <TableButton tableButtonType="Delete" quizNumber={quizNumber}/>
            </div>
        </td>
    </tr>

    return (
        <table key={quizNumber} className="quiz-table middle">
            <thead className="thead-light">
                <tr><td>{`${quizNumber}. ${data.title}`}</td></tr>
            </thead>
            <tbody>
                <tr><td>{`Number of questions: ${data.results.length}`}</td></tr>
            </tbody>
            <tbody>{tableButtons}</tbody>
        </table>
    )
}

export default LocalMenuTable;