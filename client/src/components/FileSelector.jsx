import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import File from "./File";

import api from "../api";
import {useFilesContext} from "../hooks/useFilesContext"

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
  const {files, dispatch} = useFilesContext();

  async function handleFileUpload(e) {
    
    const payload = {
      files: e.target.files,
    };

    var formData = new FormData();

    formData.append("image", e.target.files[0]);

    const response = await api.uploadImage(formData);
    const json = await response.data.data;

    if (response.data.ok){
      dispatch({type: 'CREATE_FILES', payload:json})
    }

  }

  //used for the initial setting of the list
  useEffect(() => {
    console.log('refreshing')
    const getData = async () => {
      const response = await api.fetchImages();
      const json = await response.data.data

      if (response.data.ok){
        dispatch({type: 'SET_FILES', payload: json});
      }
    }
    getData();
  }, []);

  return (
    <Wrapper>
      <TitleBar text="File Selector" />
      <FileContainer>
        <ul>
          {files && files.map((image) => (
            <File
              image={image}
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
            }}
          />
        </form>
      </ActionBar>
    </Wrapper>
  );
}

export default FileSelector;
