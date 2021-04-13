import React from 'react';
// Components

function QuizTable({number, data}) {
    const question = 
    <tr>
        <td>
            {`${number + 1}. ${data["Questions"][number]}`}
        </td>
    </tr>

    const choices = data["Choices"];
    const tableChoices = Object.keys(choices).map((key) => 
        <tr key={key}><td>{key}. {choices[key][number]}</td></tr>
    );

    return (
        <table key={number} className="quiz-table middle">
            <thead className="thead-light">{question}</thead>
            <tbody>{tableChoices}</tbody>
        </table>
    )
}

export default QuizTable;
