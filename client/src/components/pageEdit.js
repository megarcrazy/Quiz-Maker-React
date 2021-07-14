import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
// Styles
import '../components/css/edit.css';
// Components
import EditQuizTable from './editQuizTable.js';
import ChangeQuizSizeButtons from './changeQuizSizeButtons';

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
            <div className="fill">
                <div className="table-row-key"></div> 
                <div className="fill">
                    <input type="text" className="fill large-text"
                    value={newQuizData.title}
                    onChange={(event) => {handleTitleChange(event)}}
                    required/>
                </div>
            </div>
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
        <form className="add-input" onSubmit={submitQuiz}>
            <table className="quiz-table middle">
                <thead className="thead-light">{titleInput}</thead>
            </table>
            {tables}
            <br />
            <button className="btn btn-secondary middle submit-button">
                Confirm
            </button>
        </form>
    )
};

export default PageEdit;