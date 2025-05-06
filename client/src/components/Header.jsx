import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import LightToggle from "./LightToggle";


function UserBar(props) {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogoutButtonClick = () => {
        logout();
    };


    return (

        <div className="navbar h-24 bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="text-3xl mx-15">Truman's Wallpaper Engine</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal gap-x-2 mx-20">

                    <LightToggle />

                    {!user ?
                        <>
                            <li>
                                <button className="btn"><Link to="/login">Log in</Link></button>
                            </li>
                            <li>
                                <button className="btn"><Link to="/signup">Register</Link></button>
                            </li>
                        </>
                        :
                        <>
                            <li className="menu-disabled"><h5>{user.email != null ? user.email : "Guest"}</h5></li>
                            <li><button className="btn" onClick={handleLogoutButtonClick}>Log out</button></li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
}

export default UserBar;
