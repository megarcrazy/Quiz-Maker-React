import React, { useState } from 'react';
// Styles
import './css/quiz.css';

function EditQuizTable({ questionNumber, questionData, updateQuiz }) {
    const [question, setQuestion] = useState(questionData.question); 
    const [correctAnswer, setCorrectAnswer] = useState(questionData.correct_answer);
    const [incorrectAnswers, setIncorrectAnswers] = useState(questionData.incorrect_answers);
    const [choices, setChoices] = useState([correctAnswer, ...incorrectAnswers]);
    const [correctIndex, setCorrectIndex] = useState(0);

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
        updateQuiz({
            question: event.target.value,
            correct_answer: correctAnswer,
            incorrect_answers: incorrectAnswers
        }, questionNumber);
    }
    
    const handleChoiceChange = (event, index) => {
        const new_choices = Object.values({
            ...choices,
            [index]: event.target.value
        })
        setChoices(new_choices);
        if (index === correctIndex) {
            setCorrectAnswer(event.target.value);
            updateQuiz({
                question: question,
                correct_answer: event.target.value,
                incorrect_answers: incorrectAnswers
            }, questionNumber);
        } else {
            const incorrect_answers = [
                ...new_choices.slice(0, correctIndex),
                ...new_choices.slice(correctIndex + 1, choices.length)
            ]
            setIncorrectAnswers(incorrect_answers);
            updateQuiz({
                question: question,
                correct_answer: correctAnswer,
                incorrect_answers: incorrect_answers
            }, questionNumber);
        }
    }

    const handleAnswerChange = (event) => {
        const newIndex = event.target.value.charCodeAt() - "a".charCodeAt();
        setCorrectIndex(newIndex);
        const correct_answer = choices[newIndex];
        const incorrect_answer = [
            ...choices.slice(0, newIndex),
            ...choices.slice(newIndex + 1, choices.length)
        ];
        updateQuiz({
            question: question,
            correct_answer: correct_answer,
            incorrect_answers: incorrect_answer
        }, questionNumber);
    }

    const tableQuestion = 
    <tr>
        <td>
            <div className="fill">
                <div className="table-row-key">
                    {questionNumber + 1}.
                </div> 
                <div className="fill">
                    <input type="text" className="inline fill"
                    value={HTMLDecode(question)}
                    onChange={(event) => {handleQuestionChange(event)}} 
                    required/>
                </div>
            </div>
        </td>
    </tr>
    
    const tableChoices = choices.map((choice, index) => {
        const questionLabel = String.fromCharCode(index + "a".charCodeAt());
        return (
            <tr key={index}>
                <td>
                    <div className="fill">
                        <div className="table-row-key">
                            {questionLabel}.
                        </div> 
                        <div className="fill">
                            <input type="text" className="inline fill"
                            value={HTMLDecode(choice)}
                            name={index}
                            onChange={(event) => 
                                {handleChoiceChange(event, index)}
                            } 
                            required/>
                        </div>
                    </div>
                </td>
            </tr>
        )
    });

    const answer = 
    <tr>
        <td>
            <div className="fill">
                <div className="float-left">Answer</div> 
                <div className="middle">
                    <select onChange={(event) => 
                        {handleAnswerChange(event)}
                    }>
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                        <option value="d">d</option>
                    </select>
                </div>
            </div>
        </td>
    </tr>

    return (
        <table className="quiz-table play-table middle">
            <thead className="thead-light">{tableQuestion}</thead>
            <tbody className="quiz-question-body">{tableChoices}</tbody>
            <tbody>{answer}</tbody>
        </table>
    )
}

const HTMLDecode = input => {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

export default EditQuizTable;