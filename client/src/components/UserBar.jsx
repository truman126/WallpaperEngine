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
   
    <>
    <div><Link to='/' ><button>Home</button></Link></div>
    { console.log(user)}
      {!user && (
        <div>
          <Link to="/login">
            <button>Log in</button>
          </Link>
          <Link to="/signup">
            <button>Register</button>
          </Link>
        </div>
      )}
      {user && (
        <div>
          <span>{user.email}</span>
          <button onClick={handleClick}>Log out</button>
        </div>
      )}
    </>
  );
}

export default UserBar;
