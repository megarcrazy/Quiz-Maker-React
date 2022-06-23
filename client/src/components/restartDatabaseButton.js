import React from "react";
import axios from 'axios';
import styled from 'styled-components';


const Button = styled.button`
    display: table;
    margin-left: auto;
    margin-right: auto;
`;


// Button that restores the database to the default sample
function RestartDatabaseButton() {
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

export default RestartDatabaseButton;