import React, {useState} from 'react';
// Components
import QuizTable from './quizTable';

function PageQuiz({ quizData }) {
    const [buttonText, setButtonText] = useState("Submit");
    const [submitted, setSubmitted] = useState(false); 
    const [userSelection, setUserSelection] = useState(
        new Array(quizData.length).fill(null)
    );

    const submitQuiz = () => {
        setSubmitted(true);
        (submitted) && window.location.reload();   
        setButtonText((submitted) ? "Submit" : "Try Again");
    }

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

    const submitButton = 
    <button className="btn btn-secondary middle submit-button" 
    id="submit-button" onClick={submitQuiz}>
        {buttonText}
    </button>

    return (
        <>
            {tables}
            {submitButton}
            <div className="middle">
                {submitted ? 
                <div>Your Score is {score} / {quizData.length}</div> :
                <br />}
            </div>
            <br />
        </>
    )
};

export default PageQuiz;