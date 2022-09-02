import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import './Navbar.css';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav>
        <div class="topnav">
            <NavLink className="nav-item" to="/">Home</NavLink>
          {user ? (
            <>
              <NavLink className="nav-item" to="/jokes">Base Jokes</NavLink>
              <div className="fill-space"></div>
              <button className="nav-item" onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="nav-item" to="/login">Login</NavLink>
              <NavLink className="nav-item" to="/register">Register</NavLink>
            </>
          )}
        </div>
        <div className="shadow"></div>
    </nav>
  );
};

export default Navbar;