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
const OptionHeading = styled.h5``;

const Form = styled.form``;

function Options() {
  const [colour, setColour] = useState("avg");
  const [showColourPicker, showColourPickerToggle] = useState(false);

  const [size, setSize] = useState("preset");
  const [showCustomSize, showCustomSizeToggle] = useState(false);

  const [aspectRatio, setAspectRatio] = useState("none");

  return (
    <Wrapper>
      <TitleBar text="Options" />
      <Form>
        <div>
          <OptionHeading>Background Colour</OptionHeading>

          <label>
            <input
              type="radio"
              value="avg"
              checked={colour === "avg"}
              onClick={() => {setColour("avg"); showColourPickerToggle(false);}}
            />
            Average Colour
          </label>

          <label>
            <input
              type="radio"
              value="custom"
              checked={colour === "custom"}
              onClick={() => {setColour("custom"); showColourPickerToggle(true);}}
            />
            Custom
          </label>
          {showColourPicker ? <input type="color" /> : null}
        </div>

        <div>
          <OptionHeading>Image Size</OptionHeading>

          <label>
            <input
              type="radio"
              value="preset"
              checked={showCustomSize === false}
              onClick={() => {setSize("preset"); showCustomSizeToggle(false);}}
            />
            Preset
          </label>
          <label>
            <input
              type="radio"
              value="custom"
              checked={showCustomSize === true}
              onClick={() => {setSize("custom"); showCustomSizeToggle(true);}}
            />
            Custom
          </label>

          {
            showCustomSize ?
            <label>
             
            <input
              type="number" 
              onChange={(e) => {setSize(e.target); console.log(e.target.value);}}
              
              />
              <input
              type="number" 
              onChange={(e) => {setSize(e.target); console.log(e.target.value);}}
              
              />
              
            
          </label>
          :null
}

        </div>

        <div>
          <OptionHeading>Aspect Ratio</OptionHeading>
          <p>Image to Wallpaper aspect ratio</p>

          <select onChange={(e) => setAspectRatio(e.target.value)}>
            <option value={4} >1:4</option>
            <option value={8}>1:8</option>
            <option value={16}>1:16</option>
            <option value={32}>1:32</option>

          </select>

          <img />
        </div>
      </Form>
    </Wrapper>
  );
}

export default Options;
