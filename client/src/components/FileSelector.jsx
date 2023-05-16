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
const RemoveButton = styled.button`
  background-color: crimson;
  text-fill-color: white;
  color: white;
  margin-left: 7px;
  margin-right: 7px;
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
    await api.deleteWallpaperById(id);
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
          {imageData != null ? (
            imageData.map((image) => (
              <li>
                {image.key}
                <img
                  src={`http://localhost:8000/images/${image.key}`}
                  style={{ height: "100px" }}
                />
                <RemoveButton
                  id={image.key}
                  className="close"
                  type="button"
                  onClick={() => {
                    handleRemoveButtonClick(image._id);
                    getData();
                  }}
                >
                  &#x2715;
                </RemoveButton>
              </li>
            ))
          ) : (
            <p>no image</p>
          )}
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
