import React, { useState } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import api from "../api";
import { useAuthContext } from "../hooks/useAuthContext";


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
  const [downloadReady, setDownloadReady] = useState(false);
  const [customColour, setCustomColourPicker] = useState(false);
  const [customSize, setCustomSizeToggle] = useState(false);
  const [borderRatio, setRatio] = useState(4);
  const [outputFiletype, setFileType] = useState("jpeg");
  const [config, setConfig] = useState({
    colour: "average",
    size: {
      width: 1920,
      height: 1080,
    },
  });
  const {user} = useAuthContext()


  const commonResolutions = [
    [1920, 1080],
    [3840, 2160],
    [2560, 1440],
    [1366, 768],
    [1440, 900],
    [1536, 864],
    [1280, 720],
  ];

  function changeInput(e) {
    console.log(e.target.name)
    if (e.target.name == "size") {
      setConfig({
        ...config,
        [e.target.name]: {
          ...config.size,
          ["width"]: commonResolutions[e.target.value][0],
          ["height"]: commonResolutions[e.target.value][1],
        },
      });
    } else if (e.target.name == "width") {
      setConfig({
        ...config,
        ["size"]: {
          ...config.size,
          ["width"]: e.target.value,
          ...config.size.height,
        },
      });
     
    } else if (e.target.name == "height") {
      setConfig({
        ...config,
        ["size"]: {
          ...config.size,
          ...config.size.width,
          ["height"]: [e.target.value],
        },
      });
    } else {
      setConfig({ ...config, [e.target.name]: [e.target.value] });
    }
    console.log(config);
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const { colour, size, ratio, filetype } = {
      colour: config.colour,
      size: config.size,
      ratio: borderRatio,
      filetype: outputFiletype,
    };
    
    const payload = { colour, size, ratio, filetype };
    console.log(payload)
    const response = await api.generateWallpapers(payload, user);
    console.log(response.data)
    var blob = new Blob([response.data], { type: "application/zip" });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    var fileName = "wallpapers.zip";
    link.download = fileName;

    // Start download
    link.click();
  }
 

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
                setCustomColourPicker(false);
                changeInput(e);
              }}
            />
            Average Colour
          </label>

          <label>
            <input
              type="radio"
              checked={customColour}
              onChange={() => {
                {
                  setCustomColourPicker(true);
                }
              }}
            />
            Custom
          </label>
          {customColour ? (
            <input
              name="colour"
              type="color"
              value={config.colour}
              onChange={(e) => changeInput(e)}
            />
          ) : null}
        </div>

        <div>
          <OptionHeading>Image Size</OptionHeading>

            <select name="size" onChange={(e) => changeInput(e)}>
              {commonResolutions.map(([w, h], index) => (
                <option name="size" value={index}>
                  {w} x {h}
                </option>
              ))}
            </select>
          
        </div>

        <div>
          <OptionHeading>Border to Image Ratio</OptionHeading>

          <input
            onChange={(e) => setRatio(e.target.value)}
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={borderRatio}
            className="slider"
            id="myRange"
          />
          <img
            src={`http://localhost:8000/examples/${borderRatio}.png`}
            style={{ height: "100px" }}
          />
        </div>

        <div>
          <OptionHeading>Output Filetype</OptionHeading>

          <label>
            <input
              type="radio"
              checked={outputFiletype == "jpeg"}
              onChange={(e) => setFileType("jpeg")}
            />
            JPEG
          </label>
          <label>
            <input
              type="radio"
              checked={outputFiletype == "png"}
              onChange={() => setFileType("png")}
            />
            PNG
          </label>
        </div>

        <button type="submit" value="submit">
          Create Wallpapers
        </button>
      </Form>
    </Wrapper>
  );
}

export default Options;
