import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";



const Wrapper = styled.div`
  background-color: #f8f9fa;
  width: 450px;
  height: 500px;
  outline: solid;
  display: inline-block;

`;
const OptionHeading = styled.h5`

`;

const Form = styled.form`

`;

function Options() {

    return(
        <Wrapper>
            <TitleBar text="Options"/>
            <Form>

                <OptionHeading>Background Colour</OptionHeading>
                <label>
                <input type="radio" value="avg" />
                    Average Colour
                </label>

                <label>
                <input type="radio" value="custom" />
                    Custom 
                </label>


            </Form>


            </Wrapper>

    );
}

export default Options;