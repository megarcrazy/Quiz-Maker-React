import { React } from 'react';
import styled from 'styled-components';

const Table = styled.table`
    margin: 30px 0 20px 0px;
    width: 512px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
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
    display: flex;
    align-items: center;
    height: 3em;
    padding: 10px 5px;
    gap: 10px;

    > *:first-child {
        flex: 0 0 5%;
    }

    > *:nth-child(2) {
        flex: 1;

        input {
            font-size: 1.2em;
            width: 100%;
            box-sizing: border-box;
        }
  }
`;

const QuestionInput = styled.input`
    width: 100%;
    padding: 0.5em;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0,123,255,0.5);
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
    const correctIndex = questionData.answer_list.findIndex(answer => answer.is_correct);

    const updateTitle = (event) => {
        updateQuiz(questionNumber, { question_text: event.target.value });
    };

    const addAnswer = (questionIndex) => {
        const updatedAnswerList = [
            ...questionData.answer_list,
            { answer_text: "", is_correct: false }
        ];

        updateQuiz(questionIndex, { answer_list: updatedAnswerList });
    };

    const deleteAnswer = (questionIndex) => {
        if (questionData.answer_list.length <= 2) {
            alert("Cannot delete the last answer.");
            return;
        }
        const updatedAnswerList = questionData.answer_list.slice(0, -1);
        updateQuiz(questionIndex, { answer_list: updatedAnswerList });
    };

    const updateChoice = (choiceIndex, event) => {
        const updatedAnswerList = questionData.answer_list.map((answer, index) => {
            if (index === choiceIndex) {
                return { ...answer, answer_text: event.target.value };
            }
            return answer;
        });
        updateQuiz(questionNumber, { answer_list: updatedAnswerList });
    };

    const updateAnswer = (selectedIndex) => {
        const updatedAnswerList = questionData.answer_list.map((answer, index) => {
            return {
                ...answer,
                is_correct: index === selectedIndex,
            };
        });
        updateQuiz(questionNumber, { answer_list: updatedAnswerList });
    }

    const tableQuestion =
        <tr>
            <td>
                <QuestionRow>
                    <div>{questionNumber + 1}. </div>
                    <QuestionInput
                        id={`quiz_${questionNumber}`}
                        type="text"
                        value={questionData.question_text}
                        onChange={(e) => updateTitle(e)}
                        placeholder="Enter question here"
                        required
                    />
                </QuestionRow>
            </td>
        </tr>

    // Combines the correct and incorrect answers into table rows
    const tableChoices = questionData.answer_list.map((answer, index) => {
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
                                value={HTMLDecode(answer.answer_text)}
                                name={index}
                                onChange={(e) => updateChoice(index, e)}
                                required />
                        </div>
                    </ChoiceRow>
                </td>
            </tr>
        )
    });

    // User can add more or delete question choices
    const changeSizeButtons = <tr>
        <td style={{ textAlign: "center", padding: "1em" }}>
            <button
                type="button"
                onClick={() => addAnswer(questionNumber)}
                style={{ marginRight: "10px" }}
            >
                Add Answer
            </button>
            <button
                type="button"
                onClick={() => deleteAnswer(questionNumber)}
                disabled={questionData.answer_list.length <= 2}
            >
                Delete Answer
            </button>
        </td>
    </tr>

    // Select form for choosing correct answer
    const answer =
        <tr>
            <td>
                <AnswerRow>
                    <AnswerLabel>Answer</AnswerLabel>
                    <AnswerSelect
                        value={letterIndexToLetter(correctIndex)}
                        onChange={(e) => {
                            updateAnswer(letterToIndex(e.target.value));
                        }}
                    >
                        {questionData.answer_list.map((_, index) => (
                            <option key={index} value={letterIndexToLetter(index)}>
                                {letterIndexToLetter(index)}
                            </option>
                        ))}
                    </AnswerSelect>
                </AnswerRow>
            </td>
        </tr>


    return (
        <Table>
            <tbody>{tableQuestion}</tbody>
            <tbody>{tableChoices}</tbody>
            <tbody>{answer}</tbody>
            <tbody>{changeSizeButtons}</tbody>
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
const letterToIndex = (letter) => {
    if (!letter) return 0;
    return letter.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
};

// Reverse of letter to index
// eg. 0, 1, 2 => a, b, c
const letterIndexToLetter = (index) => {
    const letter = String.fromCharCode(index + "a".charCodeAt());
    return letter
};