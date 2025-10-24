import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API_URL } from '../../apiConfig'

const Table = styled.table`
  margin: 30px auto 20px;
  width: 512px;
  border-collapse: collapse;
  font-family: "Gloria Hallelujah";
  background-color: rgb(255, 255, 140);
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  
  thead {
    font-weight: bold;
    font-size: 1.2em;
  }

  td {
    padding: 20px;
  }

  @media (max-width: 768px) {
    width: 470px;
  }
`;

const ActionButtonsRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;

    button {
        position: relative;
        font-size: 1.2em;
        background-color: transparent;
        border: none;
        width: 100px;
        height: 50px;
        font-family: "Gloria Hallelujah";
        cursor: pointer;
        overflow: hidden;
        transition: transform 0.2s ease;

        /* Pseudo-element for the animated border */
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 2px solid transparent;
            box-sizing: border-box;
            pointer-events: none;
        }

        &:hover {
            transform: rotate(-15deg); /* keeps the text rotating */
        }

        &:hover::before {
            border-color: black;
            animation: drawBorder 0.5s forwards;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
    }

    @keyframes drawBorder {
        0% {
            border-top-color: black;
            border-right-color: transparent;
            border-bottom-color: transparent;
            border-left-color: transparent;
        }
        25% {
            border-top-color: black;
            border-right-color: black;
            border-bottom-color: transparent;
            border-left-color: transparent;
        }
        50% {
            border-top-color: black;
            border-right-color: black;
            border-bottom-color: black;
            border-left-color: transparent;
        }
        75% {
            border-top-color: black;
            border-right-color: black;
            border-bottom-color: black;
            border-left-color: black;
        }
        100% {
            border-color: black;
        }
    }
`;



export default function MyQuizMenuTable({ quizID, title }) {
    const [loading, setLoading] = useState(false);
    const playUrl = `/my-quizzes/play/${quizID}`;
    const editUrl = `/my-quizzes/edit/${quizID}`;

    const deleteQuiz = async () => {
        if (!window.confirm(`Are you sure you want to delete quiz number ${quizID}?`)) return;

        try {
            setLoading(true);
            await axios.post(`${API_URL}/delete-quiz/${quizID}`);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting quiz:", error);
            window.alert("Error deleting quiz.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Table>
            <thead>
                <tr><td>Quiz ID: {quizID}</td></tr>
                <tr><td>Title: {title}</td></tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <ActionButtonsRow>
                            <Link to={playUrl}><button>Play</button></Link>
                            <Link to={editUrl}><button>Edit</button></Link>
                            <button onClick={deleteQuiz} disabled={loading}>
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </ActionButtonsRow>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}
