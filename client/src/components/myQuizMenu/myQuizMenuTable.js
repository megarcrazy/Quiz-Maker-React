import React, { Link } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const Table = styled.table`
    margin: 30px 0 20px 0px; 
    width: 512px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    font-family: "Gloria Hallelujah";
    background-color: rgb(255, 255, 140);
    box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
    thead {
        font-weight: bold;
        font-size: 1.2em;
    }
    tr {
        width: 100%;
    }
    td {
        width: 100%;
        padding: 20px;
    }
    @media (max-width: 768px) {
        width: 470px;
    }
`;

const ActionButtonsRow = styled.div`
    display: table;
    margin: auto;
    
    button {
        margin: 0 10px 0 10px;
        font-size: 1em;
        background-color: rgb(0, 0, 0, 0);
        border: none;
        transition: transform 0.1s ease;
        width: 100px;
        height: 50px;
        font-family: "Gloria Hallelujah";
        &:hover {
            transform: rotate(-15deg);
            cursor: pointer;
        }
    }

`;


// Table with action buttons to play, edit or delete a saved quiz
export default function MyQuizMenuTable({ data, quizNumber }) {
    const playUrl = `/play/${quizNumber}`;
    const editUrl = `/edit/${quizNumber}`;

    const deleteQuiz = (quizNumber) => {
        if (window.confirm(`Are you sure you want to delete quiz number ${quizNumber}?`)) {
            // Get quiz data for the current quiz number
            try {
                document.body.style.cursor = "wait";
                const url = "http://localhost:3001/delete";
                axios.post(url, { quizNumber: quizNumber });
            } catch {
                window.alert("Error deleting quiz.");
            } finally {
                document.body.style.cursor = "default";
                window.location.reload();
            }
        }
    }

    const tableButtons =
        <tr>
            <td>
                <ActionButtonsRow>
                    <Link to={playUrl}>
                        <button>Play</button>
                    </Link>
                    <Link to={editUrl}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={() => deleteQuiz(quizNumber)}>Delete</button>
                </ActionButtonsRow>
            </td>
        </tr>

    return (
        <Table key={quizNumber}>
            <thead>
                <tr><td>{`${quizNumber}. ${data.title}`}</td></tr>
            </thead>
            <tbody>
                <tr><td>{`Number of questions: ${data.results.length}`}</td></tr>
            </tbody>
            <tbody>{tableButtons}</tbody>
        </Table >
    )
};