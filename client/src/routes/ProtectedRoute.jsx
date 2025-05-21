// const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
//     return isAuthenticated ? children : <Navigate to="/login" />;
//   };
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import api from "../api";

function ProtectedRoute({ children }) {

    const { user } = useAuthContext();

    async function isAdmin() {
        const response = await api.userDetails(user);
        if (response.status >= 200 && response.status < 300) {
            return (response.data.user.admin)
        }
        else return false
    }
    if (!user){
        return <Navigate to="/" />
    }
    const userIsAdmin = isAdmin();
    return ( userIsAdmin ? children : <Navigate to="/" />);


}
export default ProtectedRoute;