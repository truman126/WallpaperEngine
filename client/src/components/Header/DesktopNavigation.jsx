import { Link } from "react-router-dom";

export function DesktopNavigation(props) {
    

    const user = props.user;
    return (<div data-testid="DesktopNavigation" className="flex space-x-2">
        {!props.user ? <>
            <li><button className="btn btn-primary"><Link to="/login">Log in</Link></button></li >
            <li><button className="btn btn-primary"><Link to="/signup">Register</Link></button></li>
        </>
            :
            <>
                <li className="flex text-theme menu-disabled"><h5>{user.email != null ? user.email : "Guest"}</h5></li>
                <li className="flex"><button onClick={props.handleLogoutButtonClick} className="btn btn-secondary">Log out</button></li>

                <div className="flex space-x-2">{['admin', 'root'].includes(user.userType) && <li><Link className="my-0 py-0" to="/admin"><button className="btn btn-secondary">Admin Panel</button></Link></li>}</div>
            </>
        }
    </div>)

}