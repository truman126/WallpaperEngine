import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FilesContextProvider } from "./context/FileContext";
import { AuthContextProvider } from "./context/AuthContext";
import { BusyContextProvider } from "./context/BusyContext";
import "./styles.css";


//this is a test to see if changes are made2
const root = ReactDOM.createRoot(document.getElementById("root"));
document.title = "Wallpaper Engine"
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FilesContextProvider>
        <BusyContextProvider><App /></BusyContextProvider>
      </FilesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
