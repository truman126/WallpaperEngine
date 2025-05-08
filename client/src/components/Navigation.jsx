import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

    
export function Navigation() {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogoutButtonClick = () => {
        logout();
    };

    return (
        <>{
            !user ?
                <>
                    <li><button className="btn btn-primary"><Link to="/login">Log in</Link></button></li >
                    <li><button className="btn btn-primary"><Link to="/signup">Register</Link></button></li>
                </>
                :

                <>
                    <li className="text-theme menu-disabled"><h5>{user.email != null ? user.email : "Guest"}</h5></li>
                    <li className="flex"><button onClick={(e) => handleLogoutButtonClick()} className="btn">Log out</button></li>
                </>

        } </>

    );
}
// export function MobileNavigation() {
//     return (

//     );
// }