import React, { useState } from "react";
import api from "../api";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBRadio,
  MDBInput,
} from "mdb-react-ui-kit";

function Options(props) {
  const [customColourPicker, setCustomColourPicker] = useState(false);
  const [customColour, setCustomColour] = useState("#afe3b2");
  const [customSize, setCustomSizeToggle] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [borderRatio, setRatio] = useState(4);
  const [outputFiletype, setFileType] = useState("jpeg");
  const [config, setConfig] = useState({
    colour: "average",
    size: {
      width: 1920,
      height: 1080,
    },
  });
  const { user } = useAuthContext();

  const commonResolutions = [
    [1920, 1080],
    [3840, 2160],
    [2560, 1440],
    [1366, 768],
    [1440, 900],
    [1536, 864],
    [1280, 720],
  ];

  function changeSizeInput(e) {
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
    }
  }
  function changeInput(e) {
    setConfig({ ...config, [e.target.name]: [e.target.value] });
  }

  async function handleSubmit(e) {
    setIsDownloading(true);
    props.setLoading(true);

    e.preventDefault();
    

    const { colour, size, ratio, filetype } = {
      colour: customColourPicker ? customColour : "average",
      size: config.size,
      ratio: borderRatio,
      filetype: outputFiletype,
    };

    const payload = { colour, size, ratio, filetype };
    
    const response = await api.generateWallpapers(payload, user);

    var blob = new Blob([response.data], { type: "application/zip" });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    var fileName = "wallpapers.zip";
    link.download = fileName;

    link.click();
    setIsDownloading(false);
    props.setLoading(false);
  }

  const rowMargin = "py-1 my-4 mx-3";

  return (
    <MDBContainer className="p-3 mx-2">
      <h3>Options</h3>

      <form onSubmit={handleSubmit}>
        <MDBRow className={rowMargin}></MDBRow>
        <MDBRow className={rowMargin + "py-1"}>
          <h4>Background Colour</h4>
          <MDBRow className={rowMargin}>
       
       
          <MDBCol>
            <MDBRadio
              name='colour'
              type="radio"
              id='colour1'
              label="Use Average Colour"
              inline
              value="average"
              onChange={(e) => {
                setCustomColourPicker(false);
              }}
              checked={!customColourPicker}
            />
          </MDBCol>
          <MDBCol>
            <MDBRadio
              name='colour'
              type="radio"
              id='colour2'
              label="Select Colour"
              inline
              onChange={(e) => {
                {
                  setCustomColourPicker(true);
                }
              }}
              checked={customColourPicker}
            />
          
          {customColourPicker ? (
            <input
              className="w-25"
              name="customcolour"
              type="color"
            

              value={customColour}
              onChange={(e) => setCustomColour(e.target.value)}
            />
          ) : null}
          </MDBCol>
          </MDBRow>
        </MDBRow>

        <MDBRow className={rowMargin}>
          <h4>Image Size</h4>
          <MDBRow className={"w-auto"}>
            <select name="size" onChange={(e) => changeSizeInput(e)}>
              {commonResolutions.map(([w, h], index) => (
                <option name="size" value={index} key={index}>
                  {w} x {h}
                </option>
              ))}
            </select>
          </MDBRow>
        </MDBRow>
        <MDBRow className={rowMargin}>
          <h4>Border Size</h4>

          <MDBRow className={rowMargin}>
            <MDBRow className="w-auto px-1">
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
            </MDBRow>
          </MDBRow>
          <MDBRow>
            <MDBRow className="w-auto">
              <img
                src={`http://server.truman.xyz/examples/${borderRatio}.png`}
                style={{ height: "100px" }}
              />
            </MDBRow>
          </MDBRow>
        </MDBRow>

        <MDBRow className={rowMargin}>
          <h4>Output Filetype</h4>
          <MDBCol>
            <MDBRadio
            name='ftype'
              type="radio"
              id='ftype3'
              checked={outputFiletype == "jpeg"}
              onChange={(e) => setFileType("jpeg")}
              label="JPEG"
              inline
            />
          </MDBCol>
          <MDBCol>
            <MDBRadio
              name='ftype'
              type="radio"
              id='ftype2'
              checked={outputFiletype == "png"}
              onChange={() => setFileType("png")}
              label="PNG"
              inline
            />
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBBtn disabled={isDownloading} type="submit" value="submit">
            Create Wallpapers
          </MDBBtn>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default Options;
