import React from 'react';

function TableButton({tableButtonType, number}) {
    const currentUrl = "quiz";
    let urlPointer = (tableButtonType === "Play") ? `${currentUrl}/play/${number + 1}` : 
    (tableButtonType === `Edit` ? `${currentUrl}/edit/${number + 1}` : "#");
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