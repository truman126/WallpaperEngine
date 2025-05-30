import { createContext, useReducer } from "react";

export const FilesContext = createContext();

export const filesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILES":
      return {
        files: action.payload,
      };
    case "CREATE_FILES":
      return {
        files: [...state.files,...action.payload],
      };
    case "DELETE_FILES":
      return {
        files: state.files.filter((file) =>  file._id !== action.payload._id)
      };
      case "DELETE_ALL":
      return {
        files: []
      };
    case "UPDATE_FILE":
      state.files.map(file => (
        (file._id === action.payload._id && (file.url=action.payload.url))
      ))
      return{
        files: state.files
      };
    default:
      return state;
  }
};

export const FilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filesReducer, {
    files: null,
  });


  return (
    <FilesContext.Provider value={{...state, dispatch}}> 
      {children}
    </FilesContext.Provider>
  );
};
