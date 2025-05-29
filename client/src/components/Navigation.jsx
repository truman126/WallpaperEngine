import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";


export function Navigation() {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const [menuOpen , setMenu] = useState(false)

    const handleLogoutButtonClick = () => {
        logout();
    };

    return (
        <>{
            !user ?
                <>
                    <div className="flex space-x-2 max-md:hidden ">
                        <li><button className="btn btn-primary"><Link to="/login">Log in</Link></button></li >
                        <li><button className="btn btn-primary"><Link to="/signup">Register</Link></button></li>
                    </div>
                    <div className="relative z-10 min-md:hidden">
                        <label className="btn btn-circle swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" checked={menuOpen} onChange={(e) => (setMenu(e.target.checked))}/>

                            {/* hamburger icon */}
                            <svg
                                className="swap-off fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512">
                                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                            </svg>

                            {/* close icon */}
                            <svg
                                className="swap-on fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512">
                                <polygon
                                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                            </svg>
                        </label>
                        
                    
                    <div className={!menuOpen ? 'hidden' : "border bg-base-200 border-slate-200 rounded-lg absolute z-1 " }>
                            <ul className="menu "><li onClick={(e) => setMenu(false)}><Link to="/login">Log in</Link></li >
                            <li onClick={(e) => setMenu(false)}><Link to="/signup">Register</Link></li></ul>
                        </div>
                        </div>
                        
                </>

                :

                <>
                
                    <div className="flex flex-row max-md:hidden">
                        <li className="flex text-theme menu-disabled"><h5>{user.email != null ? user.email : "Guest"}</h5></li>
                        <li className="flex"><button onClick={(e) => {handleLogoutButtonClick();}} className="btn btn-secondary">Log out</button></li>
                        <div className="flex space-x-2">{['admin', 'root'].includes(user.userType) && <li><Link className="my-0 py-0" to="/admin"><button className="btn btn-secondary">Admin Panel</button></Link></li>}</div>
                    
                    </div> 
                    <div className="relative z-10 min-md:hidden">
                        <label className="btn btn-circle swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" checked={menuOpen} onChange={(e) => (setMenu(e.target.checked))}/>

                            {/* hamburger icon */}
                            <svg
                                className="swap-off fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512">
                                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                            </svg>

                            {/* close icon */}
                            <svg
                                className="swap-on fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512">
                                <polygon
                                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                            </svg>
                        </label>
                        
                    
                    <div className={!menuOpen ? 'hidden' : "border bg-base-200 border-slate-200 rounded-lg absolute z-1 " }>
                            <li className="text-theme content-center w-24 menu-disabled"><h5>{user.email != null ? user.email : "Guest"}</h5></li>
                        <li ><button onClick={(e) => {handleLogoutButtonClick();}} className="btn">Log out</button></li>
                        </div>
                        </div>
                        
                </>

        } </>

    );
}
