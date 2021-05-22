import React from 'react';
import { useHistory } from "react-router-dom"

function TableButton({tableButtonType, questionNumber}) {
    let history = useHistory();

    const urlPointer = 
    (tableButtonType === "Play") ? `quiz/play/${questionNumber + 1}` :
    (tableButtonType === "Edit") ? `quiz/edit/${questionNumber + 1}` :
    (tableButtonType === "Delete") && `quiz`;
    const buttonText = tableButtonType;

    const handleClick = () => {
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