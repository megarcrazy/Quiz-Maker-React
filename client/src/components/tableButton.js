import React from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';


const TableButtonWrapper = styled.button`
    margin: 0 10px 0 10px;
`;


// Action buttons for the localMenuTable for "Play", "Edit" and "Delete"
function TableButton({tableButtonType, quizNumber}) {
    const history = useHistory();
    const buttonText = tableButtonType;

    const handleClick = () => {
        if (tableButtonType === "Play") {
            history.push(`quiz/play/${quizNumber}`);
        } else if (tableButtonType === "Edit") {
            history.push(`quiz/edit/${quizNumber}`);
        } else if(tableButtonType === "Delete") {
            // Windows alert confirmation
            if (window.confirm(`Are you sure you want to delete quiz number ${quizNumber}?`)) {
                // Get quiz data for the current quiz number
                axios.post("http://localhost:3001/delete/" + quizNumber, {
                    quizNumber: quizNumber
                });
                window.location.reload();
            }
            history.push("quiz");
        }
    }

    return (
        <TableButtonWrapper onClick={handleClick}>
            {buttonText}
        </TableButtonWrapper>
    )
}

export default TableButton;