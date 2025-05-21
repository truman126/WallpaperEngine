import { useState } from "react";
import api from "../../api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBusyContext } from "../../hooks/useBusyContext";

const ratioImages = import.meta.glob("../../assets/images/ratioexamples/*.png", { eager: true });

function Options(props) {
  const [customColourPicker, setCustomColourPicker] = useState(false);
  const [customColour, setCustomColour] = useState("#afe3b2");
  const [customSize, setCustomSizeToggle] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [borderRatio, setRatio] = useState(4);
  const [outputFiletype, setFileType] = useState("jpeg");
  const { busy , dispatchBusy } = useBusyContext();
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

  const row = "flex flex-row flex-wrap py-2 justify-between content-center";
  const optionTitle = 'mb-2';
  const optionItem = 'flex flex-col mb-2';
  const radioGroup = 'radio radio-neutral mx-2 my-1';
  return (
    <div className="p-5 m-5 rounded-xl h-5/6 min-w-1/3 border border-slate-200 bg-base-300 overflow-x-auto ">
      <h3 className='mb-4'>Options</h3>

      <form onSubmit={handleSubmit}>
        <div className={`${optionItem}`}>
          <h4 className={optionTitle}>Background Colour</h4>


          <div className={`${row} min-h-28`} >
            <div className="flex flex-col justify-center">
              <div >

                <input
                  className={radioGroup}
                  name='colour'
                  type="radio"
                  id='colour1'
                  inline
                  value="average"
                  onChange={(e) => {
                    setCustomColourPicker(false);
                  }}
                  checked={!customColourPicker}
                /><label htmlFor="colour1" >Use Average Colour</label>

              </div>
              <div>

                <input
                  name='colour'
                  type="radio"
                  id='colour2'
                  className={radioGroup}
                  onChange={(e) => {
                    {
                      setCustomColourPicker(true);
                    }
                  }}
                  checked={customColourPicker}
                />
                <label htmlFor="colour2">Custom Colour</label>
              </div>
            </div>


            <div className='flex flex-col justify-center place-items-center'>
              {customColourPicker ? (

                <><p>Select colour</p>
                  <span className="h-16 w-16 rounded-full overflow-hidden">
                    <input
                      className="w-16 h-16 m-0 p-0 scale-110"
                      name="customcolour"
                      type="color"
                      value={customColour}
                      onChange={(e) => setCustomColour(e.target.value)}
                    />
                  </span></>


              ) : null}
            </div>

          </div>
        </div>

        <div className={optionItem}>
          <h4 className={optionTitle}>Image Size</h4>
          <div className={row}>
            <select name="size" className="select select-neutral w-auto" onChange={(e) => changeSizeInput(e)}>
              {commonResolutions.map(([w, h], index) => (
                <option name="size" value={index} key={index}>
                  {w} x {h}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={optionItem}>
          <h4 className={optionTitle}>Border Size</h4>

          <div className={row}>

            <div className="w-auto pr-1 content-center mr-2">
              <input
                onChange={(e) => setRatio(e.target.value)}
                type="range"
                min="1.5"
                max="5"
                step="0.5"
                value={borderRatio}
                className="range range-sm"
                id="myRange"
              />
            </div>


              <img

                src={ratioImages[`../../assets/images/ratioexamples/${borderRatio}.png`].default}
                className="w-48 h-auto"
              />

          </div>



        </div>

        <div className={optionItem}>
          <h4 className={optionTitle}>Output Filetype</h4>
          
            <div className={row}>
              <div className="flex flex-col justify-evenly">
                <div>
                  <input
                    name='ftype'
                    className={radioGroup}
                    type="radio"
                    id='ftype3'
                    checked={outputFiletype == "jpeg"}
                    onChange={(e) => setFileType("jpeg")}
              
                    inline
                  /><label htmlFor="ftype3">JPEG</label>
                </div>
                <div>
                  <input
                    name='ftype'
                    className={radioGroup}
                    type="radio"
                    id='ftype2'
                    checked={outputFiletype == "png"}
                    onChange={() => setFileType("png")}
                    label="PNG"
                    inline
                  /><label htmlFor="ftype2">PNG</label>
                </div>
              </div>
            </div>
          
        </div>

        <div>
          <button className={`btn ${isDownloading || busy ? 'btn-disabled' : 'btn-primary'}`} type="submit" value="submit">
            Create Wallpapers
          </button>
        </div>
      </form>
    </div>
  );
}

export default Options;