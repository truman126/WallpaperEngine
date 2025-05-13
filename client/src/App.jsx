import React, { useState } from "react";
import "./styles.css";

// import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';

// import 'react-tooltip/dist/react-tooltip.css'
// import "react-toggle/style.css";

// import "./index.css";



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthPage from "./pages/AuthPage";

import UserBar from "./components/UserBar";
import Header from "./components/Header";

import { useAuthContext } from "./hooks/useAuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App h-screen flex flex-col">

      <BrowserRouter basename="/">

        <Header />

        <div className="flex-1 overflow-y-auto">
          <Routes>

            {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} /> */}
            <Route path="/" element={
                <ProtectedRoute className="bg-green-100">
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

            <Route path="/login" element={!user ? <AuthPage type="Login" /> : <Navigate to="/" />} />

            <Route path="/signup" element={!user ? <AuthPage type="Signup" /> : <Navigate to="/" />} />

            <Route path="*" element={<h1>Page not found</h1>} />
            <Route path="/nouser" element={<h1>User not authorized</h1>} />




          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
