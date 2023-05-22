import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css'
import { FileSelector, Options, UserBar } from '../components'
import styled from "styled-components";


const Container = styled.div`
    display:flex;

`;


function App() {


    return (
        <>
        <UserBar />
        
        <Container>

        <FileSelector />
        <Options />
        
        </Container>
        </>
    )
}
export default App