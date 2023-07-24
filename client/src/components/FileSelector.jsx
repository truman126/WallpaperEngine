import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import File from "./File";
import api from "../api";
import {useFilesContext} from "../hooks/useFilesContext"
import { useAuthContext } from "../hooks/useAuthContext";

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
  const [error, setError] = useState();
  const {files, dispatch} = useFilesContext();
  const {user} = useAuthContext();

  async function handleFileUpload(e) {

    e.preventDefault()

    if (!user){
      setError("You must be logged in.")
      return
    }
    

    var formData = new FormData();

    const images = e.target.files;

    let tempImages  = [];


    for (const image of images){
      formData.append('images', image);
      tempImages.push({"key": image.name})
    }
    dispatch({type: 'CREATE_FILES', payload:tempImages})   
    
    
    const response = await api.uploadImage(formData , user);
    const json = await response.data.data;

    if (response.data.ok){
      dispatch({type: 'DELETE_FILES', payload:tempImages})   
      dispatch({type: 'CREATE_FILES', payload:json})   
    }

  }

  //used for the initial setting of the list
  useEffect(() => {
    const getData = async () => {

      const response = await api.fetchImages(user);
      const json = await response.data.data

      if (response.data.ok){
        dispatch({type: 'SET_FILES', payload: json});
      }
    }
    if (user)
    {
      getData();
    }
  }, [dispatch, user]);

  return (
    <Wrapper>
      <TitleBar text="File Selector" />
      <FileContainer>
        <ul>
          {files && files.map((file) => (
            <File
              image={file}
            />
          ))}
        </ul>
      </FileContainer>
      <ActionBar>
        <form>
          <input
            type="file"
            accept="image/*"
            multiple="true"
            // multiple="multiple"
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
