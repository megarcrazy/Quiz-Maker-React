import React, {useState} from 'react';
import styled from 'styled-components';
// Components
import QuizTable from './quizTable';


const SubmitButton = styled.button`
    background-color: rgb(53, 53, 53);
    width: 100px;
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

const ScoreDisplay = styled.div`
    display: table;
    margin-left: auto;
    margin-right: auto;
`;


function PageQuiz({ quizData }) {
    const [submitted, setSubmitted] = useState(false); 
    const [userSelection, setUserSelection] = useState(
        new Array(quizData.length).fill(null)
    );
    
    const submitQuiz = () => {
        setSubmitted(true);
        (submitted) && window.location.reload(); // Reload on clicking "Try Again"
    }

    // Calculates the number of correct answers
    const score = (() => {
        let score = 0;
        for (let i = 0; i < quizData.length; i++) {
            if (userSelection[i] === quizData[i].correct_answer) {
                score++;
            }
        }
        return score;
    })();

    const tables = [...Array(quizData.length).keys()].map((questionNumber) => {
        const currentData = quizData[questionNumber];
        return <QuizTable 
        key={questionNumber}
        questionNumber={questionNumber}
        question={currentData.question}
        correctAnswer={currentData.correct_answer}
        incorrectAnswer={currentData.incorrect_answers}
        submitted={submitted}
        changeUserSelection={
            (choice, questionNumber) => setUserSelection({
                ...userSelection, 
                [questionNumber]: choice
            })
        } />
    });

    return (
        <div>
            {tables}
            <SubmitButton onClick={submitQuiz}>
                {(submitted) ? "Try Again" : "Submit"}
            </SubmitButton>
            <ScoreDisplay>
                {submitted ? 
                <p>Your Score is {score} / {quizData.length}</p> :
                <br />}
            </ScoreDisplay>
            <br />
        </div>
    )
};

export default PageQuiz;