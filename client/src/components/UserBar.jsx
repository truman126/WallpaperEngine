import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


function UserBar(props) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
   
    <header>
    <div className="container">
    <Link to="/">
          <h1>Truman's Wallpaper Engine</h1>
        </Link>
      {!user && (
        <nav>
          <Link to="/login">
            <button>Log in</button>
          </Link>
          <Link to="/signup">
            <button>Register</button>
          </Link>
        </nav>
      )}
      {user && (
        <div>
          <span>{user.email}</span>
          <button onClick={handleClick}>Log out</button>
        </div>
      )}
    </div>

    </header>
  );
}

export default UserBar;
