import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Toggle from "react-toggle";

function UserBar(props) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogoutButtonClick = () => {
    logout();
  };
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) ? true : false
  );
  console.log("dark? ", isDark);
  console.log("isdark? ", isDark);
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
          <Toggle
            checked={isDark}
            onChange={({ target }) => setIsDark(target.checked)}
            icons={{ checked: "🌙", unchecked: "🔆" }}
            aria-label="Dark mode toggle"
          />
          {!user && (
            <nav>
              <Link to="/login">
              <span><button>Log in</button></span>
              </Link>
              <Link to="/signup">
                <span><button>Register</button></span>
              </Link>
            </nav>
          )}
          {user && (
            <>
              <span>{user.email != null ? user.email : "Guest"}</span>
              <button onClick={handleLogoutButtonClick}>Log out</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default UserBar;
