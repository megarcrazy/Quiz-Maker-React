import styled from 'styled-components';


const Button = styled.button`
    background-color: rgb(40, 100, 40);
    width: 200px;
    height: 50px;
    font-size: 1.2em;
    padding: 5px;
    margin-top: 40px;
    margin-bottom: 20px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    color: white;
    border-radius: 10px;
    border: none;
    transition: background-color 0.2s ease;
    &:hover {
        background-color: rgb(50, 120, 50);
        cursor: pointer;
    }
`;


export default function SubmitQuizButton({ submitted, onClick }) {
    const buttonText = submitted ? "Retry" : "Submit";
    return (
        <Button type="button" onClick={onClick}>
            {buttonText}
        </Button>
    );
}