import React from 'react';
import styled from 'styled-components';
// TODO: Refactor this mess

const Table = styled.table`
    margin: 30px 0 20px 0px;
    width: 512px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    font-family: "Gloria Hallelujah";
    background-color: rgb(255, 255, 140);
    box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
    thead {
        font-weight: bold;
        font-size: 1.2em;
    }
    @media (max-width: 768px) {
        width: 470px;
    }
    input {
        background-color: rgb(250, 250, 250);
        color: black;
        display: inline-block;
    }
    tr td {
        padding: 2px;
    }
    select {
        width: 80px;
        text-align: center;
        text-align-last: center;
    }
    option {
        text-align: center;
    }
`;

const QuestionRow = styled.div`
    height: 3em;
    padding-top: 10px;
    > * {
        &:first-child {
            width: 10%;
            float: left;
            margin-left: 10px;
        }
        &:nth-child(2) {
            width: 100%;
            input {
                font-family: "Gloria Hallelujah";
                font-size: 1.2em;
                width: 85%;
            }
        }
    }
`;

const ChoiceRow = styled.div`
    height: 2em;
    > * {
        &:first-child {
            width: 10%;
            float: left;
            height: 100%;
            margin-left: 10px;
        }
        &:nth-child(2) {
            width: 100%;
            input {
                font-family: "Gloria Hallelujah";
                width: 85%;
                height: 2em;
            }
        }
    }
`;


const AnswerRow = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const AnswerLabel = styled.label`
    color: black;
    font-size: 1.2em;
    font-weight: 600;
    display: table;
    margin-left: auto;
    margin-right: auto;
`;


const AnswerSelect = styled.select`
    display: table;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    select {
        font-family: "Gloria Hallelujah";
        height: 3em;
        width: 100px;
        &:hover {
            cursor: pointer;
        }
    }
`;


// Table containing question, choices and correct answer index
export default function EditQuizTable({ questionNumber, questionData, updateQuiz }) {
    const correctAnswer = questionData.correct_answer
    const incorrectAnswers = questionData.incorrect_answers;
    const correctIndex = questionData.correct_index;
    // Initialise choice array and insert the correct answer in the correct
    const choices = [
        ...incorrectAnswers.slice(0, correctIndex),
        correctAnswer,
        ...incorrectAnswers.slice(correctIndex, incorrectAnswers.length)
    ];

    const handleQuestionChange = (event) => {
        updateQuiz({
            ...questionData,
            question: event.target.value
        }, questionNumber);
    }

    const handleChoiceChange = (event, index) => {
        if (index === correctIndex) {
            updateQuiz({
                ...questionData,
                correct_answer: event.target.value,
            }, questionNumber);
        } else {
            const new_choices = Object.values({
                ...choices,
                [index]: event.target.value
            })
            const incorrect_answers = [
                ...new_choices.slice(0, correctIndex),
                ...new_choices.slice(correctIndex + 1, choices.length)
            ]
            updateQuiz({
                ...questionData,
                incorrect_answers: incorrect_answers
            }, questionNumber);
        }
    }

    // Change which question is the correct answer
    const handleAnswerChange = (event) => {
        const index = event.target.value.charCodeAt()
        const newIndex = letterToIndex(index);
        const correct_answer = choices[newIndex];
        const incorrect_answer = [
            ...choices.slice(0, newIndex),
            ...choices.slice(newIndex + 1, choices.length)
        ];
        updateQuiz({
            ...questionData,
            correct_answer: correct_answer,
            incorrect_answers: incorrect_answer,
            correct_index: newIndex
        }, questionNumber);
    }

    const tableQuestion =
        <tr>
            <td>
                <QuestionRow>
                    <div>{questionNumber + 1}. </div>
                    <div>
                        <input type="text" placeholder="Question"
                            value={HTMLDecode(questionData.question)}
                            onChange={(event) => { handleQuestionChange(event) }}
                            required />
                    </div>
                </QuestionRow>
            </td>
        </tr>

    // Combines the correct and incorrect answers into table rows
    const tableChoices = choices.map((choice, index) => {
        const questionLabel = letterIndexToLetter(index);
        return (
            <tr key={index}>
                <td>
                    <ChoiceRow>
                        <div>
                            {questionLabel}.
                        </div>
                        <div>
                            <input type="text" placeholder="Choice"
                                value={HTMLDecode(choice)}
                                name={index}
                                onChange={(event) => { handleChoiceChange(event, index) }}
                                required />
                        </div>
                    </ChoiceRow>
                </td>
            </tr>
        )
    });

    // Select form for choosing correct answer
    const answer =
        <AnswerRow>
            <AnswerLabel>Answer</AnswerLabel>
            <AnswerSelect onChange={(event) => { handleAnswerChange(event) }}
                value={letterIndexToLetter(correctIndex)}>
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
                <option value="d">d</option>
            </AnswerSelect>
        </AnswerRow>


    return (
        <Table>
            <thead>{tableQuestion}</thead>
            <tbody>{tableChoices}</tbody>
            <tbody>{answer}</tbody>
        </Table>
    )
}

// Converts raw string into readable HTML text
const HTMLDecode = input => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

// Converts letter to their respective number index
// eg. a, b, c => 0, 1, 2
const letterToIndex = (key) => {
    const index = key - "a".charCodeAt();
    return index
};

// Reverse of letter to index
// eg. 0, 1, 2 => a, b, c
const letterIndexToLetter = (index) => {
    const letter = String.fromCharCode(index + "a".charCodeAt());
    return letter
};