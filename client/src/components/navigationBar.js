import React from 'react';
import styled from 'styled-components';


const NavigationBarTable = styled.table`
    height: 60px;
    width: 100%;
    background-color: rgb(200, 200, 200);
    a {
        text-decoration: none;
    }
`;

const NavigationLogoCell = styled.td`
    width: 50%;
    text-align: center;
    a {
        padding: 1em 0 1em 0;
        color: rgb(50, 50, 255);
        font-size: 1.6em;
        font-weight: 600;
        font-family: "Arial";
    }
`;

const NavigationLinksCell = styled.td`
    ul {
        list-style: none;
    }
    li {
        display: inline;
    }
    a {
        font-size: 1.2em;
        padding: 1em 2em 1em 2em;
        color: black;
        @media (max-width: 768px) {
            padding: 1em 1em 1em 1em;
        }
    }
    a:hover {
        background-color: rgba(0, 0, 0, 0.1);
        text-decoration: underline;
    }
    a:visited {
        text-decoration: none;
    }
`;


function NavigationBar() {
    return (
        <NavigationBarTable>
            <tr>
                <NavigationLogoCell>
                    <a href="/home">Quiz Maker</a>
                </NavigationLogoCell>
                <NavigationLinksCell>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/quiz">Local</a></li>
                        <li><a href="/quiz/online">Online</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </NavigationLinksCell>
            </tr>
        </NavigationBarTable>
        
    )
};

export default NavigationBar;