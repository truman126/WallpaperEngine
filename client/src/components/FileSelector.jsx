import React, { useState, useEffect } from "react";
import File from "./File";
import api from "../api";
import {useFilesContext} from "../hooks/useFilesContext"
import { useAuthContext } from "../hooks/useAuthContext";



function FileSelector(props) {
  const [error, setError] = useState();
  const {files, dispatch} = useFilesContext();
  const {user} = useAuthContext();

  async function handleFileUpload(e) {
    e.preventDefault()
    setError()
    if (!user){
      setError("You must be logged in.")
      return
    }
    var formData = new FormData();
    const images = e.target.files;
    let tempImages  = [];

    for (const image of images){
      if(image.size > 20000000){
        setError("Only files sizes under 20MB are allowed.")
        return;
      }
      // else if(image.name.split(".").slice(-1)[0].toLowerCase() === 'jpeg'){
      //   setError("Unsupported file type")
      //   return;
      // }
      else if(image.type != "image/jpeg" && image.type != "image/png"){
        console.log(image.type)
        setError("Unsupported file type")
        return;
      }
      
      formData.append('images', image);
      tempImages.push({"key": image.name})
      console.log(image)

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
    <div className="files">
      <h3>Files ({files && files.length})</h3>
      {error && <div className="error">{error}</div>}

      <div className="file-list" >
          {files && files.map((file) => (
            <File
              image={file}
              key={file.key}
            />
            
          ))}
          
      </div>
        <form>
          <label className="upload-button">
            Upload Files
          <input
            type="file"
            accept="image/jpg, image/png"
            multiple={true}
            onChange={(e) => {
              handleFileUpload(e);
            }}
          />
          </label>
        </form>
      
    </div>
  );
}

export default FileSelector;
