import styled from 'styled-components';


const Wrapper = styled.div`
    width: 512px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 768px) {
        width: 450px;
    }
`;

const TitleInput = styled.input`
    font-size: 1.6em;
    width: 100%;
`;


export default function EditTitle({ title, onChange }) {
    return (
        <Wrapper>
            <TitleInput type="text" placeholder="Title"
                value={title}
                onChange={(event) => { onChange(event) }}
                required />
        </Wrapper>
    )
}