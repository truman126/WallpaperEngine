import styled from "styled-components";


function TitleBar(props){

    const Wrapper = styled.div`
        padding 7px;
        background-color:white;
        width:100%;
        border-bottom: solid;

`;

    return (


        <Wrapper><h3>{props.text}</h3></Wrapper>
    );

}

export default TitleBar