import api from "../../api";
import { useFilesContext } from "../../hooks/useFilesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";

function File(props) {

  const { files, dispatch } = useFilesContext();
  const { user } = useAuthContext();
  const [imageUrl, setImageUrl] = useState(null);
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
  async function getThumbnailURL(imageId) {
    if (!user) {
      return;
    }

    const response = await api.reloadThumbnail(imageId, user)
    await response.data;
    if (response.status >= 200 && response.status < 300) {

      dispatch({ type: "UPDATE_FILE", payload: response.data.imageKey });

    }
    // return response.data.imageKey.url;
  }


if (props.image.url == null && props.image._id) {
  getThumbnailURL(props.image._id);
}

return (
  <div className="flex bg-base-100 p-2 my-1 rounded-md justify-between border border-slate-300">

    <div className="h-16 w-16 flex-none bg-red my-auto">
      {!props.image.url ? (
          <span className="loading loading-spinner h-full w-2/3"></span>
        ) : (
          <img className='h-full w-full object-scale-down' src={import.meta.env.VITE_BASE_URL + '/content' + props.image.url} />
          

        )}
    </div>
    <span className=" my-auto items-center overflow-x-hidden">
      {props.image.name}
    </span>
    <div className="flex-none my-auto">
      <button
        id={props.image.key}
        className="btn btn-secondary btn-square"
        type="button"
        onClick={() => {
          handleDelete(props.image._id);
        }}
      >
        X
      </button>
    </div>
  </div>
);
}
export default File;
