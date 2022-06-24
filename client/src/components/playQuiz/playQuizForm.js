import React, {useState} from 'react';
import styled from 'styled-components';
// Components
import QuizQuestionTable from './quizQuestionTable';
import ScoreDisplay from './scoreDisplay';
import SubmitQuizButton from './submitQuizButton';


const Wrapper = styled.form`
    display: table;
    margin-left: auto;
    margin-right: auto;
`;


export default function PlayQuizForm({ quizData }) {
    const [submitted, setSubmitted] = useState(false); 
    const [userSelection, setUserSelection] = useState(
        new Array(quizData.length).fill(null)
    );
    
    const submitQuiz = () => {
        setSubmitted(true);
        (submitted) && window.location.reload(); // Reload on clicking "New Quiz"
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
        return <QuizQuestionTable
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
        <Wrapper>
            <SubmitQuizButton submitted={submitted} onClick={submitQuiz} />
            {tables}
            <SubmitQuizButton submitted={submitted} onClick={submitQuiz} />
            <ScoreDisplay submitted={submitted} score={score} quizLength={quizData.length}/>
        </Wrapper>
    )
};
