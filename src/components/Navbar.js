import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css';
import  { AuthContext } from "../context/auth.context"

function Navbar() {

  return (
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Refugees Welcome</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
      <NavLink className="nav-link" to="/">
                Home
      </NavLink>
      </li>
      <li class="nav-item">
      <NavLink className="nav-link" to="/refugees/">
                create Refugee
      </NavLink>
      </li>
      <li class="nav-item">
      <NavLink className="nav-link" to="/shelter/new">
                create Shelter
      </NavLink>
      </li>
    </ul>
  </div>
</nav>
  );
}

export default Navbar;