import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import 'react-tooltip/dist/react-tooltip.css'
import "react-toggle/style.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { UserBar } from "./components";
import { useAuthContext } from "./hooks/useAuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">

      <BrowserRouter basename="/">

        <UserBar />

        <div className="pages">
          <Routes>

            {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} /> */}
            <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

            <Route path="*" element={<h1>Page not found</h1>} />
            <Route path="/nouser" element={<h1>User not authorized</h1>} />




          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
