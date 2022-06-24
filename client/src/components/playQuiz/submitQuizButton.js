import styled from 'styled-components';


const Button = styled.button`
    background-color: rgb(53, 53, 53);
    border-radius: 10px;
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
    &:hover {
        background-color: rgb(97, 97, 97);
    }
`;


export default function SubmitQuizButton({ submitted, onClick }) {
    const buttonText = (submitted) ? "New Quiz" : "Submit";
    return (
        <Button type="button" onClick={onClick}>
            {buttonText}
        </Button>
    )
}