import React from "react";
import axios from 'axios';
import styled from 'styled-components';


const Button = styled.button`
    display: table;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    width: 200px;
    height: 50px;
    font-size: 1em;
    border: 1px solid white;
    border-color: gray !important;
    border-radius: 5px;
    transition: background-color 0.2s ease;
    &:hover {
        cursor: pointer;
        background-color: rgb(255, 220, 220);
    }
`;


// Button that restores the database to the default sample
export default function RestartDatabaseButton() {
    const handleClick = () => {
        if (window.confirm("Restart Database?")) {
            axios.post("http://localhost:3001/restart", {});
            window.location.reload();
        }
    }

    return (
        <Button onClick={handleClick}>
            Restart Database
        </Button>
    )
}
