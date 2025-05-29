// const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
//     return isAuthenticated ? children : <Navigate to="/login" />;
//   };
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import api from "../api";

function ProtectedRoute({ children }) {

    const { user } = useAuthContext();
    const [isAdmin, setIsAdmin] = useState();


    if (!user) {
        return <Navigate to="/" />
    }
    async function getUserPermissions() {
        const response = await api.userDetails(user);
        if (response.status >= 200 && response.status < 300) {
            const userType = response.data.user.userType;
            setIsAdmin(['root', 'admin'].includes(userType));
        } else setIsAdmin(false);
    }

    getUserPermissions();



    if (isAdmin == true) {
        return children;
    }
    else if (isAdmin == false) {
        return (<Navigate to="/" />);
    }
    else {
        
        return <div className="h-1/2 flex justify-center items-center">
            <div className="flex-none loading loading-spinner w-24 h-24"></div>
        </div>
    }

}
export default ProtectedRoute;