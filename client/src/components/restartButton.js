import React from "react";
import axios from 'axios';

function RestartButton() {
    const handleClick = () => {
        if (window.confirm("Restart Database?")) {
            axios.post("http://localhost:3001/restart", {});
            window.location.reload();
        }
    }

    return (
        <button className="btn btn-secondary" onClick={handleClick}>
            Restart Database
        </button>
    )
}

export default RestartButton;