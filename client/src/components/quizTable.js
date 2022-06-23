import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const QuizTableWrapper = styled.table`
    margin: 30px 0 20px 0px; 
    width: 512px;
    background-color: rgb(66, 66, 66);
    display: table;
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
    }
    @media (max-width: 600px) {
        width: 400px;
    }
`;


function QuizTable({ questionNumber, question, correctAnswer, incorrectAnswer, 
    submitted, changeUserSelection}) {
    const emptyArray = new Array(4).fill(0);
    const [buttonState, setButtonState] = useState(emptyArray);
    const [choices, setChoices] = useState([]);

    useEffect(() =>{
        setChoices(shuffleArray([correctAnswer, ...incorrectAnswer]));
    }, [correctAnswer, incorrectAnswer]);

    const yellowColour = { backgroundColor: "rgb(155, 155, 100)" };
    const redColour = { backgroundColor: "rgb(155, 100, 100)" };
    const greenColour = { backgroundColor: "rgb(100, 155, 100)" };
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
                <button style={buttonStyles[buttonState[index]]}
                onClick={() => changeSelection(index)}>
                    {String.fromCharCode(index + "a".charCodeAt())}. {HTMLDecode(choice)} 
                </button>
            </td>
        </tr>
    );

    return (
        <QuizTableWrapper>
            <thead>
                <tr><td>{questionNumber + 1}. {HTMLDecode(question)}</td></tr>
            </thead>
            <tbody>{tableChoices}</tbody>
        </QuizTableWrapper>
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

export default QuizTable;