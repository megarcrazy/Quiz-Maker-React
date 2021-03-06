import React from 'react';

export default function About() {
    const title = "About";
    const message = "This website was made by Vincent Tang in 2021-2022."
    
    return (
        <div className="content">
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}
