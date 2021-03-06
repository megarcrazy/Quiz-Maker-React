import React from 'react';
import styled from 'styled-components';


const NavigationBarTable = styled.table`
    height: 60px;
    width: 100%;
    background-color: rgb(180, 0, 0);
    box-shadow: 0px 2px rgba(0, 0, 0, 0.3);
    td {
        height: 60px;
    }
    a {
        text-decoration: none;
    }
`;

const NavigationLogoCell = styled.td`
    width: 50%;
    text-align: center;
    a {
        padding: 1em 0 1em 0;
        color: rgb(255, 255, 255);
        font-size: 1.6em;
        font-weight: 600;
        font-family: "Gloria Hallelujah";
    }
    @media (max-width: 768px) {
        width: 20%;
    }
`;

const NavigationLinksCell = styled.td`
    ul {
        list-style: none;
    }
    li {
        display: inline;
        white-space: nowrap;
    }
    a {
        height: 100%;
        font-size: 1em;
        padding: 1.4em 1em 1.4em 1em;
        font-family: "Arial";
        color: white;
        transition: background-color 0.1s ease;
        @media (max-width: 768px) {
            padding: 1.4em 0.5em 1.4em 0.2em;
        }
    }
    a:hover {
        background-color: rgba(255, 255, 255, 0.1);
        text-underline-offset: 5px;
        text-decoration: underline;
    }
    a:visited {
        text-decoration: none;
    }
`;


export default function NavigationBar() {
    return (
        <NavigationBarTable>
            <tr>
                <NavigationLogoCell>
                    <a href="/home">Quiz Maker</a>
                </NavigationLogoCell>
                <NavigationLinksCell>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/my-quizzes">My Quizzes</a></li>
                        <li><a href="/random-online-quiz">Random Quiz</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </NavigationLinksCell>
            </tr>
        </NavigationBarTable>
        
    )
};
