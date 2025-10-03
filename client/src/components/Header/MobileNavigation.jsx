import { useState } from "react";
import { Link } from "react-router-dom";



export function MobileNavigation(props) {
 
 
 
    const [menuOpen, setMenu] = useState(false)
    const user = props.user;


    return (
        <div data-testid="MobileNavigation" className="relative z-10">
            <label className="btn btn-circle swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" checked={menuOpen} onChange={(e) => (setMenu(e.target.checked))} />

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


            <div className={!menuOpen ? 'hidden' : "absolute right-0 border bg-base-200 border-slate-200 rounded-lg z-1 w-auto"}>
                <>{!props.user ?
                    <ul className="menu ">
                        <li onClick={(e) => setMenu(false)}><Link to="/login">Log in</Link>
                        </li >
                        <li onClick={(e) => setMenu(false)}><Link to="/signup">Register</Link>
                        </li>
                    </ul>
                    : <ul>
                        <li className="text-theme content-center menu-disabled">
                            <h5>{user.email != null ? user.email : "Guest"}</h5>
                        </li>
                        {['admin', 'root'].includes(user.userType) && <li>
                            <button  className="btn">Admin Panel</button>
                        </li>}
                        <li>
                            <button onClick={props.handleLogoutButtonClick} className="btn">Log out</button>
                        </li>
                    </ul>

                }
                </>
            </div>
        </div>
    )
}