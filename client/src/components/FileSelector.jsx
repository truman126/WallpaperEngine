import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import File from "./File";

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
  > ul > li:hover {
    background-color: lightgrey;
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

function FileSelector(props) {
  const [imageData, setImageData] = useState([]);

  async function getData() {
    await api.fetchImages().then((res) => {
      setImageData(res.data.data);
    });
  }

  async function handleFileUpload(e) {
    const payload = {
      files: e.target.files,
    };

    var formData = new FormData();

    formData.append("image", e.target.files[0]);

    await api.uploadImage(formData).then(() => getData());
  }

  async function handleRemoveButtonClick(id) {
    await api.deleteImage(id);
  }

  //used for the initial setting of the list
  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <TitleBar text="File Selector" />
      <FileContainer>
        <ul>
          {imageData.map((image) => (
            <File
              image={image}
              getData={getData}
              remove={handleRemoveButtonClick}
            />
          ))}
        </ul>
      </FileContainer>
      <ActionBar>
        <form>
          <input
            type="file"
            accept="image/*"
            multiple="multiple"
            onChange={(e) => {
              handleFileUpload(e);
              getData();
            }}
          />
        </form>
      </ActionBar>
    </Wrapper>
  );
}

export default FileSelector;
