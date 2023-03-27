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
  const { name, color } = { name: file.name, color: "#123456" };
  const payload = { name, color };

  await api.insertWallpaper(payload).then((res) => {});
};

const removeItem = async (fileID) => {
  console.log(fileID);
  console.log("attemping to remove");

  await api.deleteWallpaperById(fileID).then((res) => {});
};



function FileSelector(props) {
  const [imageData, setImageData] = useState([]);

  async function handleFileUpload(e){
    //check
    for (var i = 0; i < e.target.files.length; i++) {
      requestUpload(e.target.files[i]);
    }
    getData();
  };

  async function getData() {
    const result = await api.getWallpapers();
    setImageData(result.data.data);
    console.log('getting data')
  }




  //for refreshing the list of images
  useEffect(() => {
    getData();
  }, []);
  console.log(imageData)
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
                onClick={() => {removeItem({file}.file._id); getData();}}
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
