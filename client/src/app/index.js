import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FileSelector, Options } from '../components'
import styled from "styled-components";


const Container = styled.div`
    display:flex;

`;


function App() {
    return (
        <Container>
        <FileSelector />
        {/* <Options /> */}
        
        </Container>
    )
}
export default App