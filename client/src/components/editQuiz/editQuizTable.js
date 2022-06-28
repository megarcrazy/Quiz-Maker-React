import React from 'react';
import styled from 'styled-components';


const Table = styled.table`
    margin: 30px 0 20px 0px; 
    width: 512px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    thead {
        font-weight: bold;
        font-size: 1.2em;
        td {
            background-color: rgb(200, 180, 255);
            border: none;
            border-radius: 10px 10px 0 0;
        }
    }
    tbody {
        border: 1px solid gray;
    }
    
    @media (max-width: 768px) {
        width: 470px;
    }
`;

const QuestionRow = styled.div`
    height: 2em;
    > * {
        &:first-child {
            width: 10%;
            float: left;
        }
        &:nth-child(2) {  
            width: 100%;
            input {
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
        }
        &:nth-child(2) {
            width: 100%;
            input {
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
    > * {
        &:first-child {
            color: black;
            font-size: 1.2em;
            font-weight: 600;
            display: table;
            margin-left: auto;
            margin-right: auto;
        }
        &:nth-child(2) {
            display: table;
            margin-left: auto;
            margin-right: auto;
            select {
                height: 2em;
                width: 100px;
            }
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

    // Converts letter to their respective number index
    // eg. a, b, c => 0, 1, 2
    const letterToIndex = (key, reveresed) => {
        if (reveresed) {
            return String.fromCharCode(key + "a".charCodeAt());
        }
        return key - "a".charCodeAt();
    }

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
        const newIndex = letterToIndex(event.target.value.charCodeAt(), false);
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
                    onChange={(event) => {handleQuestionChange(event)}} 
                    required />
                </div>
            </QuestionRow>
        </td>
    </tr>
    
    // Combines the correct and incorrect answers into table rows
    const tableChoices = choices.map((choice, index) => {
        const questionLabel = letterToIndex(index, true);
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
                            onChange={(event) => {handleChoiceChange(event, index)}} 
                            required/>
                        </div>
                    </ChoiceRow>
                </td>
            </tr>
        )
    });

    // Select form for choosing correct answer
    const answer = 
    <tr>
        <td>
            <AnswerRow>
                <div>
                    Answer
                </div> 
                <div>
                    <select onChange={(event) => {handleAnswerChange(event)}} 
                    value={letterToIndex(correctIndex, true)}>
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                        <option value="d">d</option>
                    </select>
                </div>
            </AnswerRow>
        </td>
    </tr>

    return (
        <Table cellpadding="0">
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
