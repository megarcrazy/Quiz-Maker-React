import styled from 'styled-components';


const Button = styled.button`
    font-size: 1.4em;
    color: white;
    background-color: rgb(100, 100, 100);
    padding: 10px 50px 10px 50px;
    border-radius: 10px;
    display: table;
    margin-left: auto;
    margin-right: auto;

    &:hover {    
        background-color: rgb(53, 53, 53);
        text-decoration: none;
    }
`;


export default function AddNewQuizButton({ onClick }) {
    return (
        <Button onClick={onClick}>
            Add New Quiz
        </Button>
    )
}