import React from 'react';

function TableButton({tableButtonType, questionNumber}) {
    const currentUrl = "quiz";
    let urlPointer = 
    (tableButtonType === "Play") ? `${currentUrl}/play/${questionNumber + 1}` : 
    (tableButtonType === `Edit` ? `${currentUrl}/edit/${questionNumber + 1}` :
    currentUrl);
    const buttonText = tableButtonType;

    return (
        <a href={urlPointer}>
            <button className="btn btn-secondary my-button-style">
                {buttonText}
            </button>
        </a>
    )
}

export default TableButton;