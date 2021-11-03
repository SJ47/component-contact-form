import styled from "styled-components";

export const StyledContactUsContainer = styled.div`
    height: 50vh;
    width: 80%;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;
    

    p {
        font-size: 1.2rem;
        margin-bottom: 0em;
    }

    h1 {
        color: red;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        padding-top: 2.2em;
        font-weight: bold;
        padding-bottom: .4em;
    }

    input, textarea {
        font-size: 1.3rem;
        font-family: 'Roboto', sans-serif;
        padding: .7em;
        border: 1px solid lightgrey;
        border-radius: 5px;
    }

    input:last-of-type {
        margin-top: 1.5em;
        color: red;
        border: none;
        background: white;
        border: 2px solid red;
        font-weight: bold;
        font-size: 1.2rem;

        &:hover {
            background: red;
            color: white;
            cursor: pointer;
        }
    }
`;