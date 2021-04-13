import React from 'react';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/navigationBar.css'

function NavigationBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand navigationLogo" href="/home">Quiz Maker</a>
            <a className="navbar-brand navLink" href="/home">Home</a>
            <a className="navbar-brand navLink" href="/quiz">Quiz</a>
            <a className="navbar-brand navLink" href="/about">About</a>
        </nav>
    )
};

export default NavigationBar;