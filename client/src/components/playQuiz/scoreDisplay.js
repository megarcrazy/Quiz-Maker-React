import styled from 'styled-components';


const Wrapper = styled.div`
    display: table;
    margin-left: auto;
    margin-right: auto;
    height: 50px;
`;


export default function ScoreDisplay({ submitted, score, quizLength}) {
    const displayText = submitted && <p>Your Score is {score} / {quizLength}</p>;
    return (
        <Wrapper>
            {displayText}
        </Wrapper>
    )
}