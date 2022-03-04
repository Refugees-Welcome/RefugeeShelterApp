import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css';
import  { AuthContext } from "../context/auth.context"

function Navbar() {

  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Refugees Welcome</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
      <NavLink className="nav-link" to="/">
                Home
      </NavLink>
      </li>
      <li className="nav-item">
      {/* <NavLink className="nav-link" to="/refugee/">
                Refugees
      </NavLink> */}
      </li>
      <li className="nav-item">
      <NavLink className="nav-link" to="/refugees/">
                create Refugee
      </NavLink>
      </li>
      <li class="nav-item">
      <NavLink className="nav-link" to="/shelter/new">
                create Shelter
      </NavLink>
      </li>
      <li className="nav-item">
      <NavLink className="nav-link" to="/login/">
                Login
      </NavLink>
      </li>
      <li className="nav-item">
      <NavLink className="nav-link" to="/Signup/">
                Signup
      </NavLink>
      </li>
    </ul>
  </div>
</nav>
  );
}

export default Navbar;