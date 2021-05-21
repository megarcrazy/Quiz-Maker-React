import React from 'react';

function About() {
    const title = "About";
    const message = "This website was made by Vincent Tang in 2021."
    
    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}

export default About;