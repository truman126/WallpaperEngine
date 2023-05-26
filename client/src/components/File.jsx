import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import api from "../api";
import { useFilesContext } from "../hooks/useFilesContext";

const RemoveButton = styled.button`
  background-color: crimson;
  text-fill-color: white;
  color: white;
  margin-left: 7px;
  margin-right: 7px;
`;

function File(props) {
  const { files, dispatch } = useFilesContext();

  console.log(props.image)

  async function handleDelete(id) {
    
    const response = await api.deleteImage(id);

    const json = await response.data.data;

    console.log(json)

    if (response.data.ok) {
      dispatch({ type: "DELETE_FILES", payload: json });
    }
  }
  return (
    <li>
      <img
        src={`http://localhost:8000/images/${props.image.key}`}
        style={{ height: "100px" }}
      />
      <RemoveButton
        id={props.image.key}
        className="close"
        type="button"
        onClick={() => {
          handleDelete(props.image._id);
        }}
      >
        &#x2715;
      </RemoveButton>
    </li>
  );
}
export default File;
