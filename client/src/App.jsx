import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthPage from "./pages/AuthPage";

import Header from "./components/Header/Header";

import { useAuthContext } from "./hooks/useAuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
  

function App() {
  const { user } = useAuthContext();
  
  return (
    <div className="App h-screen flex flex-col">

      <BrowserRouter basename="/">

        <Header user={user} />

        <div className="flex-1 overflow-y-auto">
          <Routes>

            {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} /> */}
            <Route path="/" element={

              user ? <Home /> : <Navigate to="/login" />

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
