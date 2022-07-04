import React from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';


const Button = styled.button`
    margin: 0 10px 0 10px;
    font-size: 1em;
    background-color: rgb(0, 0, 0, 0);
    border: none;
    transition: transform 0.1s ease;
    width: 100px;
    height: 50px;
    font-family: "Gloria Hallelujah";
    &:hover {
        transform: rotate(-15deg);
        cursor: pointer;
    }
`;


// Action buttons for the localMenuTable for "Play", "Edit" and "Delete"
export default function TableButton({tableButtonType, quizNumber}) {
    const history = useHistory();
    const buttonText = tableButtonType;

    const handleClick = () => {
        if (tableButtonType === "Play") {
            history.push(`my-quizzes/play/${quizNumber}`);
        } else if (tableButtonType === "Edit") {
            history.push(`my-quizzes/edit/${quizNumber}`);
        } else if (tableButtonType === "Delete") {
            // Windows alert confirmation
            if (window.confirm(`Are you sure you want to delete quiz number ${quizNumber}?`)) {
                // Get quiz data for the current quiz number
                axios.post("http://localhost:3001/delete/" + quizNumber, {
                    quizNumber: quizNumber
                });
                window.location.reload();
            }
            history.push("my-quizzes");
        }
    }

    return (
        <Button onClick={handleClick}>
            {buttonText}
        </Button>
    )
}
