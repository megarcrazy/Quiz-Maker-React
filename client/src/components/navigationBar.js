import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const NavBar = styled.nav`
    width: 100%;
    display: flex;
    background-color: rgb(180, 0, 0);
    box-shadow: 0px 2px rgba(0, 0, 0, 0.3);
    a {
        text-decoration: none;
    }
`;

const NavLogo = styled.div`
    padding-left: 10%;
    width: 50%;
    position: relative;
    a {
        display: inline-flex;
        align-items: center;
        height: 100%;
        padding-left: 1em;
        padding-right: 1em;
        color: rgb(255, 255, 255);
        font-size: 1.6em;
        font-weight: 600;
        font-family: "Gloria Hallelujah";
    }
`;

const NavLinks = styled.div`
    width: 50%;
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
        color: white;
        transition: background-color 0.1s ease;
        font-family: "Gloria Hallelujah";
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
        <NavBar>
            <NavLogo>
                <Link to="/home">Quiz Maker</Link>
            </NavLogo>
            <NavLinks>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/my-quizzes">My Quizzes</Link></li>
                    <li><Link to="/random-online-quiz">Random Quiz</Link></li>
                </ul>
            </NavLinks>
        </NavBar>
    )
};
