import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import api from "../api";
import loader from "../1488.gif"
import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const RemoveButton = styled.button`
  background-color: crimson;
  text-fill-color: white;
  color: white;
  margin-left: 7px;
  margin-right: 7px;
`;

function File(props) {
  const { files, dispatch } = useFilesContext();
  const { user } = useAuthContext();

  async function handleDelete(id) {
    if (!user){
      return
    }
    const response = await api.deleteImage(id, user);

    const json = await response.data.data;

    if (response.data.ok) {
      dispatch({ type: "DELETE_FILES", payload: json });
    }
  }
  return (
    <li>
      <img
        src={!props.image.url ?
        loader : props.image.url}
        style={{ height: "50px" }}
      />
      {props.image.key}
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
