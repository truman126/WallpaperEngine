// const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
//     return isAuthenticated ? children : <Navigate to="/login" />;
//   };
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

function ProtectedRoute({children}){
    // const user = JSON.parse(localStorage.getItem('user'));
    const {user} = useAuthContext();
    return user ? children : <Navigate to="/login" />;


}
export default ProtectedRoute;