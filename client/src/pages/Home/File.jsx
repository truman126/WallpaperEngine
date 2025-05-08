import React, { useState, useEffect } from "react";
import api from "../../api";
import { useFilesContext } from "../../hooks/useFilesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { MDBBtn } from "mdb-react-ui-kit";

function File(props) {
  
  const { files, dispatch } = useFilesContext();
  const { user } = useAuthContext();

  async function handleDelete(id) {
    if (!user) {
      return;
    }
    const response = await api.deleteImage(id, user);

    const json = await response.data.data;
    if (response.status >= 200 && response.status < 300) {
      dispatch({ type: "DELETE_FILES", payload: json });
    }
  }
  async function getThumbnailURL(imageId){
    if (!user) {
      return;
    }
    
    const response = await api.reloadThumbnail(imageId, user)
    await response.data;
    if (response.status >= 200 && response.status < 300) {

      dispatch({ type: "UPDATE_FILE", payload:response.data.imageKey });
      return response.data.imageKey.url;
    }
    
    
  }
 
  if(props.image.url == null && props.image._id){
    
    getThumbnailURL(props.image._id);
  }
  return (
    <div className="flex justify-between">
      <div className="flex">
        {!props.image.url ? (
          <section className="loader"></section>
        ) : (
          <img src={props.image.url}
          // onError={({currentTarget}) => {
          //   currentTarget.onError = null; // prevents looping
          //   const url = reloadThumbnail(props.image._id, user);
          //   currentTarget.src= url;
        
          // }}
          />
        )}
      </div>
      <div className="flex">
        <p>{props.image.name}</p>
      </div>
      <div className="flex">
        <button
          id={props.image.key}
          className="btn btn-secondary delete me-1"
          type="button"
          onClick={() => {
            handleDelete(props.image._id);
          }}
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}
export default File;
