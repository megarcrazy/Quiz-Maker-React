import React, { useState } from 'react';
// Components
// Styles
import '../css/play.css';

function QuizTable({questionNumber, data, changeUserSelection, submitted}) {
    const emptyArray = new Array(4).fill(0);
    const answerIndex = data["Answers"][questionNumber].charCodeAt(0) -
    'a'.charCodeAt(0);
    // const solution = Object.values({...emptyArray, [answerIndex]: 1})
    const [buttonState, SetButtonState] = useState(emptyArray);
    
    // Question
    const question = 
    <tr>
        <td>
            {questionNumber + 1}. {data["Questions"][questionNumber]}
        </td>
    </tr>

    // Table Rows
    
    // Styles depending on button state
    const noColour = { backgroundColor: null };
    const yellowColour = { backgroundColor: "rgb(155, 155, 100)" };
    const redColour = { backgroundColor: "rgb(155, 100, 100)" };
    const greenColour = { backgroundColor: "rgb(100, 155, 100)" };
    const buttonStyles =
    [
        noColour, // Default
        (!submitted) ? yellowColour : redColour, // Select
        (!submitted) ? yellowColour : greenColour // Correct
    ]

    const changeSelection = (choiceIndex) => {
        if (!submitted) {
            // Convert user choice index to characters a, b, c, d
            changeUserSelection(questionNumber, 
            String.fromCharCode(choiceIndex + 'a'.charCodeAt(0)));
            SetButtonState({
                ...emptyArray,
                [choiceIndex]: (choiceIndex === answerIndex) ? 2 : 1,
            });
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
