import React from 'react';
import styled from 'styled-components';
// Components
import TableButton from './tableButton.js';


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
`;


// Table with action buttons to play, edit or delete a saved quiz
export default function MyQuizMenuTable({data, quizNumber}) {
    const tableButtons = 
    <tr>
        <td>
            <ActionButtonsRow>
                <TableButton tableButtonType="Play" quizNumber={quizNumber}/>
                <TableButton tableButtonType="Edit" quizNumber={quizNumber}/>
                <TableButton tableButtonType="Delete" quizNumber={quizNumber}/>
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
}
