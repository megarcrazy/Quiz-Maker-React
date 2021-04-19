import React, { useState } from 'react';
// Components
// Styles
import '../css/play.css';

function QuizTable({questionNumber, data, changeUserSelection, submitted}) {
    const initialButtonState = new Array(4).fill(0);
    let [buttonState, SetButtonState] = useState(initialButtonState);

    // Question
    const question = 
    <tr>
        <td>
            {questionNumber + 1}. {data["Questions"][questionNumber]}
        </td>
    </tr>

    // Table Rows
    
    // Styles depending on button state
    let buttonStyles =
    [
        { backgroundColor: null }, // Default
        { backgroundColor: "rgb(155, 155, 100)" }, // Select
        { backgroundColor: "rgb(155, 100, 100)" }, // Incorrect
        { backgroundColor: "rgb(100, 155, 100)" } // Correct
    ]


    const changeSelection = (choiceIndex) => {
        if (!submitted) {
            // Convert user choice index to characters a, b, c, d
            changeUserSelection(questionNumber, String.fromCharCode(choiceIndex + 'a'.charCodeAt(0)));
            SetButtonState(
                [
                    ...initialButtonState.slice(0, choiceIndex), 
                    1,
                    ...initialButtonState.slice(choiceIndex + 1)
                ]
            );
        } 
    }
    const choices = data["Choices"];
    const tableChoices = Object.keys(choices).map((key, index) => 
        <tr key={key}>
            <td>
                <button style={buttonStyles[buttonState[index]]} 
                onClick={() => changeSelection(index)}>
                    {key}. {choices[key][questionNumber]}
                </button>
            </td>
        </tr>
    );

    return (
        <table key={questionNumber} className="quiz-table play-table middle">
            <thead className="thead-light">{question}</thead>
            <tbody className="quiz-question-body">{tableChoices}</tbody>
        </table>
    )
}

export default QuizTable;
