import React from 'react';
import styled from 'styled-components';

const ChangeQuizSizeButtonWrapper = styled.div`
    display: table;
    margin-left: auto;
    margin-right: auto;
    button {
        width: 50px;
        height: 50px;
        color: white;
        background-color: rgb(146, 146, 146);
        margin-left: 10px;
        margin-right: 10px;
        font-size: 1.4em;
        &:active, &:focus {
            outline: none;
            border-color: white;
            box-shadow: none;
            background-color: rgb(185, 185, 185);
        }
        &:hover, &:focus {
            outline: none;
            border-color: white;
            box-shadow: none;
            background-color: rgb(185, 185, 185);
        }
    }
`;


// The add button "+": adds a new question below
// The subtract button "-": deletes the question above
function ChangeQuizSizeButtons({ questionNumber, increaseSize, decreaseSize }) {
    return (
        <ChangeQuizSizeButtonWrapper>
            <button type="button" onClick={() => increaseSize(questionNumber)}>
                +
            </button>
            <button type="button" onClick={() => decreaseSize(questionNumber)}>
                -
            </button>
        </ChangeQuizSizeButtonWrapper>
    )
}

export default ChangeQuizSizeButtons;