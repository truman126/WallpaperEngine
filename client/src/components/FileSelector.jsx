import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #f8f9fa;
  width: 500px;
  height: 750px;
  position: relative;
  outline: solid;
`;
const FileContainer = styled.div`
  overflow: scroll;
`;
const TitleBar = styled.div`
    padding 7px;
    background-color:white;
    width:100%;
    border-bottom: solid;

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
  const [uploadedFiles, setUploadedFiles] = useState([]);


  const handleFileUpload = (e) => {
    const fileList = [...e.target.files]
    console.log(e.target.files[0].name)

    setUploadedFiles(fileList)
  };

  return (
    <Wrapper>
      <TitleBar>
        <h3>File Selector</h3>
      </TitleBar>
      <FileContainer>
      <ul>
      {uploadedFiles.map((file) => (
        <li>{file[0].name}</li>
      ))}
    </ul>
      </FileContainer>
      <ActionBar>
        <input type="file" accept="image/*" onChange={handleFileUpload}/>
      </ActionBar>
    </Wrapper>
  );
}

export default FileSelector;
