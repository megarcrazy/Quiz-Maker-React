import React from "react";
import styled from "styled-components";

const Table = styled.table`
    margin: 30px 0 20px 0px; 
    width: 512px;
    background-color: rgb(200, 200, 200);
    border: 2px solid black;
    display: table;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    font-family: "Gloria Hallelujah";

    thead {
        font-weight: bold;
        font-size: 1.4em;
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
        font-size: 1.2em;
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

export default function QuizQuestionResultTable({
    questionIndex,
    questionID,
    questionText,
    choicesData,
    selectedAnswerID,
    correctAnswerID,
}) {
    const HTMLDecode = (input) => {
        const doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    };

    const tableChoices = choicesData.map((choice, idx) => {
        const isSelected = choice.answer_id === selectedAnswerID;
        const isCorrect = choice.answer_id === correctAnswerID;

        let backgroundColor = "white"; // default
        if (!selectedAnswerID && isCorrect) {
            // User did not select an answer
            backgroundColor = "lightgray";
        } else if (isCorrect) {
            // Correct answer
            backgroundColor = "lightgreen";
        } else if (isSelected && !isCorrect) {
            // Wrong answer
            backgroundColor = "salmon";
        }

        return (
            <tr key={idx}>
                <td>
                    <button
                        style={{
                            backgroundColor,
                            cursor: "default",
                        }}
                    >
                        {String.fromCharCode(idx + "a".charCodeAt())}.{" "}
                        {HTMLDecode(choice.answer_text)}
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        {questionIndex + 1}. {HTMLDecode(questionText)}
                    </th>
                </tr>
            </thead>
            <tbody>{tableChoices}</tbody>
        </Table>
    );
}