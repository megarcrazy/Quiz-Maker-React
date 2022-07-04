import styled from 'styled-components';


const Button = styled.button`
    font-size: 1.2em;
    color: black;
    background-color: rgb(150, 255, 150);
    padding: 10px 50px 10px 50px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    border: none;
    border-radius: 5px;
    height: 50px;
    transition: background-color 0.2s ease;
    &:hover {    
        background-color: rgb(100, 180, 100);
        text-decoration: none;
        cursor: pointer;
    }
`;


export default function AddNewQuizButton({ onClick }) {
    return (
        <Button onClick={onClick}>
            Add New Quiz
        </Button>
    )
}