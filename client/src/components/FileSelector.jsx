import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import api from "../api";

const Wrapper = styled.div`
  background-color: #f8f9fa;
  width: 450px;
  height: 500px;
  position: relative;
  outline: solid;
  margin: 0;
`;
const FileContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;

  > ul {
    max-height: 380px;
  }
`;

const ActionBar = styled.div`
    bottom:0px;
    position: absolute;
    background-color:white;
    width:100%;
    border-top: solid;
    padding 7px;
`;
const RemoveButton = styled.button`
  background-color: crimson;
  text-fill-color: white;
  color: white;
  margin-left: 7px;
  margin-right: 7px;
`;

const requestUpload = async (file) => {

};

const removeItem = async (id) => {
  
  
};



function FileSelector(props) {
  const [imageData, setImageData] = useState([]);

  async function getData() {
    console.log("getting data")
    await api.getWallpapers().then((result) => setImageData(result.data.data));
    
  };

  async function handleFileUpload(e){
    //check
    for (var i = 0; i < e.target.files.length; i++) {
      const { name, color } = { name: e.target.files[i].name, color: "#123456" };
      const payload = { name, color };
    
      await api.insertWallpaper(payload).then(() => getData());
    }


    
  };

  async function handleRemoveButtonClick(id){
    await api.deleteWallpaperById(id).then(() => getData());
  };




  //used for the initial setting of the list
  useEffect(() => {
    getData()
  }, []);



  return (
    <Wrapper>
      <TitleBar text="File Selector" />
      <FileContainer>
        <ul>
          {imageData.map((file) => (
            <li key={file._id}>
              {file.name}
              <RemoveButton
                id={file}
                
                className="close"
                type="button"
                onClick={() => {handleRemoveButtonClick({file}.file._id); getData();}}
              >
                &#x2715;
              </RemoveButton>
            </li>
          ))}
        </ul>
      </FileContainer>
      <ActionBar>
        <input
          type="file"
          accept="image/*"
          multiple="multiple"
          onChange={(e) => handleFileUpload(e)}
        />
      </ActionBar>
    </Wrapper>
  );
}

export default FileSelector;
