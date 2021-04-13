import React from 'react';

function Home() {
    const title = `Welcome`;
    const message = `With the Quiz Maker, you can make, edit or play your quizzes.
    Please click on "Quiz" to get started.`;
    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}

export default Home;