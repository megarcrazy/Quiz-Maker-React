import React from 'react';
// Styles
import './css/quiz.css';

function EditQuizTable({ questionNumber, questionData, updateQuiz }) {
    const correctAnswer = questionData.correct_answer
    const incorrectAnswers = questionData.incorrect_answers;
    const correctIndex = questionData.correct_index;
    const choices = [
        ...incorrectAnswers.slice(0, correctIndex),
        correctAnswer,
        ...incorrectAnswers.slice(correctIndex, incorrectAnswers.length)
    ];

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
        const new_choices = Object.values({
            ...choices,
            [index]: event.target.value
        })
        if (index === correctIndex) {
            updateQuiz({
                ...questionData,
                correct_answer: event.target.value,
            }, questionNumber);
        } else {
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
            <div className="fill">
                <div className="table-row-key">
                    {questionNumber + 1}.
                </div> 
                <div className="fill">
                    <input type="text" className="inline fill"
                    value={HTMLDecode(questionData.question)}
                    onChange={(event) => {handleQuestionChange(event)}} 
                    required/>
                </div>
            </div>
        </td>
    </tr>
    
    const tableChoices = choices.map((choice, index) => {
        const questionLabel = letterToIndex(index, true);
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
                            onChange={(event) => {handleChoiceChange(event, index)}} 
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
                    <select onChange={(event) => {handleAnswerChange(event)}} 
                    value={letterToIndex(correctIndex, true)}>
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
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

export default EditQuizTable;