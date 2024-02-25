import React, { useState, useEffect } from "react";
import api from "../api";
import { useFilesContext } from "../hooks/useFilesContext";
import { useAuthContext } from "../hooks/useAuthContext";

function File(props) {
  const { files, dispatch } = useFilesContext();
  const { user } = useAuthContext();

  async function handleDelete(id) {
    if (!user) {
      return;
    }
    const response = await api.deleteImage(id, user);

    const json = await response.data.data;

    if (response.data.ok) {
      dispatch({ type: "DELETE_FILES", payload: json });
    }
  }
  async function reloadThumbnail(id){
    if (!user) {
      return;
    }

    const response = await api.reloadThumbnail(id, user)
    const json = await response.data.data;

    dispatch({ type: "UPDATE_FILE", payload:json });
    return json.data.url;
    
  }
  return (
    <div className="file-details container">
      {!props.image.url ? (
        <section className="loader"></section>
      ) : (
        <img src={props.image.url} 
        onError={({currentTarget}) => {
          
          currentTarget.onError = null; // prevents looping
          const url = reloadThumbnail(props.image._id, user);
          currentTarget.src= url;
          
        }}
        />
      )}
      <p>{props.image.name}</p>
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
