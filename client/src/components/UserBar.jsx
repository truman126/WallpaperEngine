import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Toggle from "react-toggle";
import { MDBBtn } from "mdb-react-ui-kit";


function UserBar(props) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogoutButtonClick = () => {
    logout();
  };
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) ? true : false
  );
  useEffect(() => {
    localStorage.setItem("isDark", isDark);
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Truman's Wallpaper Engine</h1>
        </Link>

        <div className="nav-buttons">
          <span><Toggle
            checked={isDark}
            onChange={({ target }) => setIsDark(target.checked)}
            icons={{ checked: "🌙", unchecked: "🔆" }}
            aria-label="Dark mode toggle"
          />
          </span>
          {!user && (
            <>
              <Link to="/login">
                <span><MDBBtn>Log in</MDBBtn></span>
              </Link>
              <Link to="/signup">
              <span><MDBBtn>Register</MDBBtn></span>
              </Link>
            </>
          )}
          {user && (
            <>
              <span>{user.email != null ? user.email : "Guest"}</span>
              <span><MDBBtn onClick={handleLogoutButtonClick}>Log out</MDBBtn></span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default UserBar;
