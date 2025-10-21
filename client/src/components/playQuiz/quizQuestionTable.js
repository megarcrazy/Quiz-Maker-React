import React, { useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
    margin: 30px 0 20px 0px; 
    width: 512px;
    background-color: rgb(200, 200, 200);
    border: 2px solid black;
    display: table;
    margin-left: auto;
    margin-right: auto;
    font-family: "Gloria Hallelujah";

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
        font-family: "Gloria Hallelujah";
        background-color: white;
        color: black;
        text-align: left;
        padding: 10px;
        width: 100%;
        border: none;
        border: 1px solid white;
        transition: background-color 0.4s ease;
        &:hover {
            border: 1px solid black;
            cursor: pointer;
        }
    }

    @media (max-width: 600px) {
        width: 400px;
    }
`;

export default function QuizQuestionTable({ questionIndex, questionID, questionText, choicesData, handleSelect }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleSelection = (answer_id) => {
        setSelectedAnswer(answer_id);
        handleSelect(questionID, selectedAnswer);
    };

    const tableChoices = choicesData.map((choice, index) => {
        const isSelected = selectedAnswer === choice.answer_id;
        return (
            <tr key={index}>
                <td>
                    <button
                        type="button"
                        style={{
                            backgroundColor: isSelected ? "rgb(255, 255, 150)" : "white",
                        }}
                        onClick={() => handleSelection(choice.answer_id)}
                    >
                        {String.fromCharCode(index + "a".charCodeAt())}. {HTMLDecode(choice.answer_text)}
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <Table>
            <thead>
                <tr>
                    <td>{questionIndex + 1}. {HTMLDecode(questionText)}</td>
                </tr>
            </thead>
            <tbody>{tableChoices}</tbody>
        </Table>
    );
}

const HTMLDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
};
