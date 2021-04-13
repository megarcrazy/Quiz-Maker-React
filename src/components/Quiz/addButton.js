import React from 'react'

function AddButton() {
    const buttonText = "Add New Quiz";
    const urlPointer = "quiz/add";
    return (
        <a className="no-underline" href={urlPointer}>
            <button className="btn btn-light middle" id="add-button">
                {buttonText}
            </button>
        </a>
    )
}

export default AddButton;