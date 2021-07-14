import React from 'react';

// "+": adds a new question below
// "-": deletes current question
function ChangeQuizSizeButtons({ questionNumber, increaseSize, decreaseSize }) {
    return (
        <div className="middle ">
            <button type="button" className="btn change-size-button" 
            onClick={() => increaseSize(questionNumber)}>
                +
            </button>
            <button type="button" className="btn change-size-button" 
            onClick={() => decreaseSize(questionNumber)}>
                -
            </button>
        </div>
    )
}

export default ChangeQuizSizeButtons;