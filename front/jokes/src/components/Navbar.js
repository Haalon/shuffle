import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import './Navbar.css';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav>
        <div className="topnav">
            <NavLink className="nav-item" to="/" end>Home</NavLink>
          {user ? (
            <>
              <NavLink className="nav-item" end to="/jokes">Base Jokes</NavLink>

              <div className="fill-space"></div>
              
              <button className="nav-item" onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <>
              <div className="fill-space"></div>
              <NavLink className="nav-item" to="/login">Login</NavLink>
              <NavLink className="nav-item" to="/register">Register</NavLink>
            </>
          )}
        </div>
    </nav>
  );
};

export default Navbar;