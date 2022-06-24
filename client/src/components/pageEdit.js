import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
// Components
import EditQuizTable from './editQuizTable.js';
import ChangeQuizSizeButtons from './changeQuizSizeButtons';


const QuizTable = styled.table`
    margin: 30px 0 20px 0px; 
    width: 512px;
    background-color: rgb(150, 150, 150);
    display: table;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    thead {
        font-weight: bold;
        font-size: 1.2em;
    }
    tr {
        width: 100%;
        border: 1px solid rgb(255, 255, 255);
    }
    td {
        width: 100%;
        padding: 20px;
    }
`;

const TableRowKey = styled.div`
    top: 50%;
    width: 15px;
    display: inline-block;
    vertical-align: middle;
`;

const QuizEditorForm = styled.form`
    input {
        background-color: rgb(250, 250, 250);
        color: black;
        margin-left: 10px;
        display: inline-block;
    }
    table tr td {
        padding: 10px;
    }
    select {
        width: 80px;
        text-align: center;
        text-align-last: center;
        background-color: rgb(230, 230, 230);
    }
    option {
        text-align: center;
    }
`;

const TitleInput = styled.input`
    font-size: 1.4em;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const SubmitButton = styled.button`
    background-color: rgb(53, 53, 53);
    width: 200px;
    height: 50px;
    font-size: 1.2em;
    padding: 5px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    color: white;
    &:hover {
        background-color: rgb(97, 97, 97);
    }
`;

const FillWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

function PageEdit({ quizNumber, quizData }) {
    const history = useHistory();
    const [newQuizData, setNewQuizData] = useState(quizData);

    // Dictionary template for question in the database
    const newQuestion = {
        question: "",
        correct_answer: "",
        incorrect_answers: ["", "", ""],
        correct_index: 0
    }; 

    // Add new question at the location of the button
    const increaseSize = (index) => {
        const newQuiz = [
            ...newQuizData.results.slice(0, index + 1), 
            newQuestion,
            ...newQuizData.results.slice(index + 1, newQuizData.results.length)
        ]
        setNewQuizData({
            title: newQuizData.title,
            results: newQuiz
        });
    }

    // Remove question above the button
    const decreaseSize = (index) => {
        if (newQuizData.results.length === 1) {
            window.alert("Quiz cannot be empty.");
        } else if (window.confirm(`Deleting question ${index + 1}. Are you sure?`)) {
            const newQuiz = [
                ...newQuizData.results.slice(0, index), 
                ...newQuizData.results.slice(index + 1, newQuizData.results.length)
            ]
            setNewQuizData({
                title: newQuizData.title,
                results: newQuiz
            });
        }
    }

    // Update the quiz after changing a state in the child component
    const updateQuiz = (newData, questionNumber) => {
        setNewQuizData({
            ...newQuizData,
            results: Object.values({
                ...newQuizData.results,
                [questionNumber]: newData
            })
        });
    }
    
    const handleTitleChange = (event) => {
        setNewQuizData({
            ...newQuizData,
            title: event.target.value
        });
    }

    const titleInput = 
    <tr>
        <td>
            <FillWrapper>
                <TableRowKey></TableRowKey> 
                <FillWrapper>
                    <TitleInput type="text"
                    value={newQuizData.title}
                    onChange={(event) => {handleTitleChange(event)}}
                    required/>
                </FillWrapper>
            </FillWrapper>
        </td>
    </tr>;

    const tables = [...Array(newQuizData.results.length).keys()].map((questionNumber) => {
        return (
            <div key={questionNumber}>
                <EditQuizTable 
                questionNumber={questionNumber}
                questionData={newQuizData.results[questionNumber]}
                updateQuiz={updateQuiz}
                />
                <ChangeQuizSizeButtons 
                questionNumber={questionNumber}
                increaseSize={increaseSize}
                decreaseSize={decreaseSize}
                />
            </div>
        )
    });

    // Request user confirmation and upload the editted quiz dictionary to the server
    const submitQuiz = (event) => {
        event.preventDefault();
        if (window.confirm("Are you sure?")) {
            axios.post("http://localhost:3001/edit/" + quizNumber, {
                quizData: newQuizData
            });
            history.push("/quiz");
        }
    }

    return (
        <QuizEditorForm onSubmit={submitQuiz}>
            <QuizTable>
                <thead>{titleInput}</thead>
            </QuizTable>
            {tables}
            <SubmitButton>Confirm</SubmitButton>
        </QuizEditorForm>
    )
};

export default PageEdit;