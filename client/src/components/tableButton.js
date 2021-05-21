import React from 'react';

function TableButton({tableButtonType, questionNumber}) {
    const urlPointer = `quiz/play/${questionNumber + 1}`
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