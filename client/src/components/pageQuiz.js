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
        (submitted) && window.location.reload(); // Reload on clicking "Try Again"
        setButtonText((submitted) ? "Submit" : "Try Again");
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
        <>
            {tables}
            <button className="btn btn-secondary middle submit-button" onClick={submitQuiz}>
                {buttonText}
            </button>
            <div className="middle">
                {submitted ? 
                <p>Your Score is {score} / {quizData.length}</p> :
                <br />}
            </div>
            <br />
        </>
    )
};

export default PageQuiz;