import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: table;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 50px;
    button {
        width: 50px;
        height: 50px;
        color: black;
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
export default function ChangeQuizSizeButtons({ questionNumber, increaseSize, decreaseSize }) {
    return (
        <Wrapper>
            <button type="button" onClick={() => increaseSize(questionNumber)}>
                +
            </button>
            <button type="button" onClick={() => decreaseSize(questionNumber)}>
                -
            </button>
        </Wrapper>
    )
}
