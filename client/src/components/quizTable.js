import React, { useState, useEffect } from 'react';
// Styles
import './css/play.css';

function QuizTable({ questionNumber, question, correctAnswer, incorrectAnswer, 
    submitted, changeUserSelection}) {
    const emptyArray = new Array(4).fill(0);
    const [buttonState, setButtonState] = useState(emptyArray);
    const [choices, setChoices] = useState([]);

    useEffect(() =>{
        setChoices(shuffleArray([correctAnswer, ...incorrectAnswer]));
    }, [correctAnswer, incorrectAnswer]);

    const tableQuestion = 
    <tr>
        <td>
            {questionNumber + 1}. {HTMLDecode(question)}
        </td>
    </tr>

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
    const answerIndex = choices.indexOf(correctAnswer);
    const changeSelection = (choiceIndex) => {
        if (!submitted) {
            changeUserSelection(choices[choiceIndex], questionNumber);
            setButtonState({
                ...emptyArray,
                [choiceIndex]: (choiceIndex === answerIndex) ? 
                correctKey : incorrectKey,
            });
        } 
    }

    const tableChoices = choices.map((choice, index) => 
        <tr key={index}>
            <td>
                <button style={buttonStyles[buttonState[index]]}
                onClick={() => changeSelection(index)}>
                    {String.fromCharCode(index + "a".charCodeAt())}. {HTMLDecode(choice)} 
                </button>
            </td>
        </tr>
    );

    return (
        <table className="quiz-table play-table middle">
            <thead className="thead-light">{tableQuestion}</thead>
            <tbody className="quiz-question-body">{tableChoices}</tbody>
        </table>
    )
}

// Durstenfeld shuffle
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const HTMLDecode = input => {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

export default QuizTable;