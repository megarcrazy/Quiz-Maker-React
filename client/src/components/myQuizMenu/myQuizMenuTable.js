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
    thead {
        font-weight: bold;
        font-size: 1.2em;
        tr { 
            td {
                border: none;
                background-color: rgb(200, 180, 255);
                border-radius: 20px 20px 0 0;
            }   
        }
    }
    tr {
        width: 100%;
    }
    td {
        border-left: 1px solid gray;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        width: 100%;
        padding: 20px;
    }
    @media (max-width: 768px) {
        width: 470px;
    }
`;

const ActionButtonsRow = styled.div`
    display: table;
    margin-left: auto;
    margin-right: auto;
    button {
        width: 80px;
        height: 50px;
        border-radius: 20px 5px 20px 5px;
        border: 0;
        &:hover {
            border: 2px solid black;
        }
    }
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
