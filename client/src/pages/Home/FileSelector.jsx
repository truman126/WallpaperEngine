import { useState, useEffect, useRef } from "react";
import File from "./File";
import api from "../../api";
import { useFilesContext } from "../../hooks/useFilesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBusyContext } from "../../hooks/useBusyContext"

function FileSelector(props) {
  const [error, setError] = useState();
  const { files, dispatch } = useFilesContext();
  const { user } = useAuthContext();
  const { busy, dispatchBusy } = useBusyContext();
  const fileInputRef = useRef();

  async function handleDeleteAll() {
    if (!user) {
      return;
    }
    const response = await api.deleteAllImages(user.id, user);

    if (response.status >= 200 && response.status < 300) {
      dispatch({ type: "DELETE_ALL" });
    }
  }

  async function handleFileUpload(e) {
    e.preventDefault();
    setError();
    if (!user) {
      setError("You must be logged in.");
      return;
    }
    dispatchBusy({ type: "BUSY" })
    var formData = new FormData();
    const images = e.target.files;
    let tempImages = [];

    for (const image of images) {
      if (image.size > 10000000) {
        setError("Only files sizes under 10MB are allowed.");
        dispatchBusy({ type: "FREE" })

        return;
      } else if (image.type != "image/jpeg" && image.type != "image/png") {

        setError("Unsupported file type");
        dispatchBusy({ type: "FREE" })

        return;
      }

      formData.append("images", image);
      tempImages.push({ key: image.name });

    }

    dispatch({ type: "CREATE_FILES", payload: tempImages });

    const response = await api.uploadImage(formData, user);
    

    if (response.status >= 200 && response.status < 300) {
      dispatch({ type: "DELETE_FILES", payload: tempImages });
      dispatch({ type: "CREATE_FILES", payload: response.data.images });
    }
    dispatchBusy({ type: "FREE" })
  }

  //used for the initial setting of the list
  useEffect(() => {
    const getData = async () => {
      if(!user){
        setError("No user, signing out...")
        return;
      }
      const response = await api.fetchImages(user);

      if (response.status >= 200 && response.status < 300) {
        dispatch({ type: "SET_FILES", payload: response.data.images });
      }
    };
    if (user) {
      getData();
    }
  }, [dispatch, user]);

  return (
    <div className="bg-base-300 h-5/6 min-w-1/3 rounded-xl m-5 p-5 border border-slate-200">
      {files && (
        <>
          <div className="py-3">
            <div className='flex justify-between'>
              <h3>
                Files ({files && files.length})
                <div data-tooltip-id="file-types" className="help-tip"></div>
              </h3>
              {files && files.length > 0 && (
                <button
                  className="btn btn-secondary"
                  color="danger"
                  onClick={() => {
                    handleDeleteAll();
                  }}
                >
                  Delete all
                </button>
              )}
            </div>
          </div>

          <div className="px-4 py-4 mx-2 max-h-3/4 min-h-2/3 overflow-y-scroll">

            {error && <div className="error">{error}</div>}

            <div className="">
              {files &&
                files.map((file) => <File image={file} key={file.key} />)}
            </div>

          </div>


          <fieldset className="fieldset">
            <legend onClick={() => fileInputRef.current.click()} className="fieldset-legend">Pick a file</legend>
            <input onChange={
              handleFileUpload
            } ref={fileInputRef} multiple={true} type="file" accept="image/jpeg,image/png" className="file-input" />
            <label className="label">Max size 10MB. JPEG/PNG only.</label>
          </fieldset>
        </>
      )}
      {!files && (
        <div className="loading">
          <section className="loader"></section>
        </div>
      )}
    </div>

  );
}

export default FileSelector;
