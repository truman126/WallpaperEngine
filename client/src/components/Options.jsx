import React, { useState } from "react";
import api from "../api";
import { useAuthContext } from "../hooks/useAuthContext";



function Options(props) {
  const [customColourPicker, setCustomColourPicker] = useState(false);
  const [customColour, setCustomColour] = useState('#afe3b2')
  const [customSize, setCustomSizeToggle] = useState(false);
  const [borderRatio, setRatio] = useState(4);
  const [outputFiletype, setFileType] = useState("jpeg");
  const [config, setConfig] = useState({
    colour: 'average',
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
  function changeInput(e){
    setConfig({ ...config, [e.target.name]: [e.target.value] });

  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(customColourPicker)

    const { colour, size, ratio, filetype } = {
      colour: customColourPicker ? customColour : 'average',
      size: config.size,
      ratio: borderRatio,
      filetype: outputFiletype,
    };

    const payload = { colour, size, ratio, filetype };
    console.log(payload);
    const response = await api.generateWallpapers(payload, user);

    var blob = new Blob([response.data], { type: "application/zip" });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    var fileName = "wallpapers.zip";
    link.download = fileName;

    link.click();
  }

  return (
    <div className="wallpaper-options">
      <form onSubmit={handleSubmit}>
        <h3>Options</h3>
        <div>
          <h4>Background Colour</h4>

          <label>
            <input
              name="colour"
              value="average"
              className="radio"
              type="radio"
              checked={!customColourPicker}
              onChange={(e) => {
                setCustomColourPicker(false);
              }}
            />
            Use Image Colour
          </label>

          <label>
            <input
              className="radio"
              type="radio"
              checked={customColourPicker}
              onChange={(e) => {
                {
                  setCustomColourPicker(true);
                }
              }}
            />
            Custom
          </label>
          {customColourPicker ? (
            <input
              name="colour"
              type="color"
              value={customColour}
              onChange={(e) => setCustomColour(e.target.value)}
            />
          ) : null}
        </div>

        <div>
          <h4>Image Size</h4>

          <select name="size" onChange={(e) => changeSizeInput(e)}>
            {commonResolutions.map(([w, h], index) => (
              <option name="size" value={index}>
                {w} x {h}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h4>Border to Image Ratio</h4>

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
          <h4>Output Filetype</h4>

          <label>
            <input
              className="radio"
              type="radio"
              checked={outputFiletype == "jpeg"}
              onChange={(e) => setFileType("jpeg")}
            />
            JPEG
          </label>
          <label>
            <input
              className="radio"
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
      </form>
      </div>
    
  );
}

export default Options;
