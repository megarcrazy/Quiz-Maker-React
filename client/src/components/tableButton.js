import React from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";

function TableButton({tableButtonType, quizNumber}) {
    const history = useHistory();

    const urlPointer = 
    (tableButtonType === "Play") ? `quiz/play/${quizNumber}` :
    (tableButtonType === "Edit") ? `quiz/edit/${quizNumber}` :
    (tableButtonType === "Delete") && `quiz`;
    const buttonText = tableButtonType;

    const handleClick = () => {
        if (tableButtonType === "Delete") {
            if (window.confirm("Are you sure?")) {
                axios.post("http://localhost:3001/delete/" + quizNumber, {
                    quizNumber: quizNumber
                });
                window.location.reload();
            }
        }
        history.push(urlPointer);
    }

    return (
        <button className="btn btn-secondary my-button-style"
        onClick={handleClick}>
            {buttonText}
        </button>
    )
}

export default TableButton;