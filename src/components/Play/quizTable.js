import React, { useState } from 'react';
// Components
// Styles
import '../css/play.css';

function QuizTable({questionNumber, data, changeUserSelection, submitted}) {
    const emptyArray = new Array(4).fill(0);
    const answerIndex = 
    data["Answers"][questionNumber].charCodeAt() - 'a'.charCodeAt();
    const [buttonState, setButtonState] = useState(emptyArray);
    
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
        (!submitted) ? yellowColour : redColour, // Select, red if wrong
        (!submitted) ? yellowColour : greenColour // Correct
    ]

    const incorrectKey = 1;
    const correctKey = 2; 
    const changeSelection = (choiceIndex) => {
        if (!submitted) {
            // Convert user choice index to characters a, b, c, d
            changeUserSelection(questionNumber, 
            String.fromCharCode(choiceIndex + 'a'.charCodeAt()));
            setButtonState({
                ...emptyArray,
                [choiceIndex]: (choiceIndex === answerIndex) ? 
                correctKey : incorrectKey,
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
