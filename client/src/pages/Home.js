import React from 'react';

export default function Home() {
    const title = `Welcome`;
    const message = `With the Quiz Maker, you can play your quizzes 
    by clicking on "Quiz" to get started. Else you can click "Random"
    to generate a random quiz from online.`;
    
    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}
