import React, { useState, useEffect } from "react";
import api from "../api";
import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Spinner from 'react-bootstrap/Spinner';


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
    <div className="file-details">
      {!props.image.url ? 
      <Spinner animation="border" variant="primary" /> :

    
      <img
        src={props.image.url}
      />
}
      <p>{props.image.key}</p>
      <button
        variant="danger"
        id={props.image.key}
        className="delete"
        type="button"
        onClick={() => {
          handleDelete(props.image._id);
        }}
      >
        &#x2715;
      </button>
    </div>
  );
}
export default File;
