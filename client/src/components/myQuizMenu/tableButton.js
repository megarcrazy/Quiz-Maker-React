import React from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';


const Button = styled.button`
    margin: 0 10px 0 10px;
    font-size: 1em;
    background-color: rgb(200, 200, 200);
    border-color: rgb(200, 200, 200) !important;
    transition: border-color 1s ease;
    &:hover {
        border-color: black !important;
        cursor: pointer;
    }
`;


// Action buttons for the localMenuTable for "Play", "Edit" and "Delete"
export default function TableButton({tableButtonType, quizNumber}) {
    const history = useHistory();
    const buttonText = tableButtonType;

    const handleClick = () => {
        if (tableButtonType === "Play") {
            history.push(`quiz/play/${quizNumber}`);
        } else if (tableButtonType === "Edit") {
            history.push(`quiz/edit/${quizNumber}`);
        } else if(tableButtonType === "Delete") {
            // Windows alert confirmation
            if (window.confirm(`Are you sure you want to delete quiz number ${quizNumber}?`)) {
                // Get quiz data for the current quiz number
                axios.post("http://localhost:3001/delete/" + quizNumber, {
                    quizNumber: quizNumber
                });
                window.location.reload();
            }
            history.push("quiz");
        }
    }

    return (
        <Button onClick={handleClick}>
            {buttonText}
        </Button>
    )
}
