import styled from 'styled-components';


const Button = styled.button`
    background-color: rgb(53, 53, 53);
    width: 200px;
    height: 50px;
    font-size: 1.2em;
    padding: 5px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    color: white;
    &:hover {
        background-color: rgb(97, 97, 97);
        cursor: pointer;
    }
`;


export default function ConfirmEditButton() {
    return (
        <Button>
            Confirm
        </Button>
    )
}