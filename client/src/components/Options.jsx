import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import api from "../api";


const Wrapper = styled.div`
  background-color: #f8f9fa;
  width: 450px;
  height: 500px;
  outline: solid;
  display: inline-block;
`;
const OptionHeading = styled.h5``;

const Form = styled.form``;

function Options(props) {
  const [customColour, setCustomColourPicker] = useState(false);
  const [customSize, setCustomSizeToggle] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("none");
  const [config, setConfig] = useState({ 
    colour: "average", 
    size: 
    {
      width: 1920,
      height: 1080
    }})

  const commonResolutions = [
    [1920, 1080],
    [3840, 2160],
    [2560, 1440],
    [1366, 768],
    [1440, 900],
    [1536, 864],
    [1280, 720],
  ];

  function changeInput(e){

    if (e.target.name=="size"){
      setConfig({...config, 
        [e.target.name]: {
          ...config.size, 
          ["width"]:commonResolutions[e.target.value][0] , ["height"]:commonResolutions[e.target.value][1]
  
        }});
    console.log(config.size)

    }
    else{
    
        setConfig({...config, [e.target.name]: [e.target.value]});
    
    }
  };


  function handleSubmit(e){
    // e.preventDefault()

      const { colour, size } = { colour: config.colour, size: config.size };
      const payload = { colour, size };
      api.generateWallpapers(payload).then();
  };

  return (
    <Wrapper>
      <TitleBar text="Options" />
      <Form onSubmit={handleSubmit}>
        <div>
          <OptionHeading>Background Colour</OptionHeading>

          <label>
            <input
              name="colour"
              value="average"
              type="radio"
              checked={!customColour}
              onChange={(e) => {
                setCustomColourPicker(false); changeInput(e);
              }}
            />
            Average Colour
          </label>

          <label>
            <input
              type="radio"
              checked={customColour}
              onChange={() => {{
                setCustomColourPicker(true); 
              }
              }}
            />
            Custom
          </label>
          {customColour ? <input name="colour" type="color" value={config.colour} onChange={(e) => changeInput(e)}/> : null}
        </div>

        <div>
          <OptionHeading>Image Size</OptionHeading>

          <label>
            <input
              type="radio"
              checked={!customSize}
              onChange={(e) => setCustomSizeToggle(false)}
            />
            Preset
          </label>
          <label>
            <input
              type="radio"
              checked={customSize}
              onChange={() => setCustomSizeToggle(true)}
            />
            Custom
          </label>
          <br></br>

          {customSize ? (
            <label>
              <input onChange={(e) => changeInput(e)}
                type="number"
                name="width"
              />
              <input onChange={(e) => changeInput(e)}
                type="number"
                name="height"

                
              />
            </label>
          ) : (
            <select name={"size"} onChange={(e) => changeInput(e)}>
              {commonResolutions.map(([w,h],index) => (
               
                <option name={["width", "height"]} value={index}>

                  {w} x {h}
                </option>
              ))}
            </select>
          )}
        </div>

        <div style={{display:"none"}}>
          <OptionHeading>Aspect Ratio</OptionHeading>
          <small>Image to Wallpaper aspect ratio</small>

          <select onChange={(e) => setAspectRatio(e)}>
            <option value={4}>1:4</option>
            <option value={8}>1:8</option>
            <option value={16}>1:16</option>
            <option value={32}>1:32</option>
          </select>

          <img />
        </div>

        <button type="submit" value="submit">Submit</button>
      </Form>
    </Wrapper>
  );
}

export default Options;
