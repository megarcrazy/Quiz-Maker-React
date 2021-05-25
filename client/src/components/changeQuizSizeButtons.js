import React from 'react';

function ChangeQuizSizeButtons({ questionNumber, increaseSize, decreaseSize }) {
    // "+": adds a new question below
    // "-": deletes current question
    
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