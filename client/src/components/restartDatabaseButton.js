import React from "react";
import axios from 'axios';

function RestartDatabaseButton() {
    const handleClick = () => {
        if (window.confirm("Restart Database?")) {
            axios.post("http://localhost:3001/restart", {});
            window.location.reload();
        }
    }

    return (
        <button className="btn btn-secondary middle" onClick={handleClick}>
            Restart Database
        </button>
    )
}

export default RestartDatabaseButton;