import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";

const Wrapper = styled.div`
  background-color: #f8f9fa;
  width: 450px;
  height: 500px;
  position: relative;
  outline: solid;
  margin:0;
`;
const FileContainer = styled.div`
  overflow: scroll;
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

  background-color:crimson;
  text-fill-color:white;
  color:white;
  margin-left:7px;
  margin-right:7px;
`;

function FileSelector(props) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {

    console.log(e.target.files)

    //remove duplicates
    for (var i=0; i < e.target.files.length; i++){
      for (var j=0; j < uploadedFiles.length; j++){
        if (e.target.files[i].name==uploadedFiles[j].name) {
          e.target.files.remove(i)
        }
      }
    }


    //concat the incoming files and the current list
    const fileList = uploadedFiles.concat(...e.target.files);


    setUploadedFiles(fileList);

  };

  

  return (
    <Wrapper>
      <TitleBar text="File Selector" />
      <FileContainer>
        <ul>
          {uploadedFiles.map((file) => (
            <li>{file.name}<RemoveButton class="close" type="button">&#x2715;</RemoveButton></li>
            
            
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
