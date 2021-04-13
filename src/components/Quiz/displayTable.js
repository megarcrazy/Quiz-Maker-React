import React from 'react';
// Components
import TableButton from './tableButton.js';

function DisplayTable({number, data}) {
    const question = `${number + 1}. ${data["Title"]}`;
    const numberOfQuestions = `Number of questions: ${data["Questions"].length}`;

    return (
        <table key={number} className="quiz-table middle">
            <thead className="thead-light">
                <tr><td>{question}</td></tr>
            </thead>
            <tbody>
                <tr><td>{numberOfQuestions}</td></tr>
            </tbody>
            <tbody>
                <tr>
                    <td>
                        <div className="middle">
                            <TableButton tableButtonType={`Play`} number={number}/>
                            <TableButton tableButtonType={`Edit`} number={number}/>
                            <TableButton tableButtonType={`Delete`} number={number}/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default DisplayTable;