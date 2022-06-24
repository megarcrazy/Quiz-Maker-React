import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const Table = styled.table`
    margin: 30px 0 20px 0px; 
    width: 512px;
    background-color: rgb(200, 200, 200);
    border: 2px solid black;
    display: ta ble;
    margin-left: auto;
    margin-right: auto;
    thead {
        font-weight: bold;
        font-size: 1.2em;
        padding: 20px;
    }
    tbody {
        td {
            padding: 0;
        }
    }
    button {
        background-color: white;
        color: black;
        text-align: left;
        padding: 10px;
        width: 100%;
        border: none;
        border: 1px solid white;
        &:hover {
            border: 1px solid black;
        }
    }
    @media (max-width: 600px) {
        width: 400px;
    }
`;


export default function QuizQuestionTable({ questionNumber, question, correctAnswer, incorrectAnswer, 
    submitted, changeUserSelection}) {
    const emptyArray = new Array(4).fill(0);
    const [buttonState, setButtonState] = useState(emptyArray);
    const [choices, setChoices] = useState([]);

    useEffect(() =>{
        setChoices(shuffleArray([correctAnswer, ...incorrectAnswer]));
    }, [correctAnswer, incorrectAnswer]);

    const yellowColour = { backgroundColor: "rgb(255, 255, 100)" };
    const redColour = { backgroundColor: "rgb(255, 120, 120)" };
    const greenColour = { backgroundColor: "rgb(120, 255, 120)" };
    const buttonStyles =
    [
        // Selected choice is yellow before submission
        null, // Default
        (!submitted) ? yellowColour : redColour, // Red if Wrong
        (!submitted) ? yellowColour : greenColour // Green if Correct
    ]

    const changeSelection = (choiceIndex) => {
        if (!submitted) {
            const correct = 2;
            const incorrect = 1;
            changeUserSelection(choices[choiceIndex], questionNumber);
            setButtonState({
                ...emptyArray,
                [choiceIndex]: (choices[choiceIndex] === correctAnswer) ? 
                correct : incorrect,
            });
        } 
    }

    const tableChoices = choices.map((choice, index) => 
        <tr key={index}>
            <td>
                <button type="button" style={buttonStyles[buttonState[index]]}
                onClick={() => changeSelection(index)}>
                    {String.fromCharCode(index + "a".charCodeAt())}. {HTMLDecode(choice)} 
                </button>
            </td>
        </tr>
    );

    return (
        <Table>
            <thead>
                <tr><td>{questionNumber + 1}. {HTMLDecode(question)}</td></tr>
            </thead>
            <tbody>{tableChoices}</tbody>
        </Table>
    )
}

// Durstenfeld shuffle to shuffle quiz choices
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
