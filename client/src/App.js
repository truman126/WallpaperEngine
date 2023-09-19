import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { UserBar } from "./components";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">

      <BrowserRouter basename="/wallpaperengine">

        <UserBar />

        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
