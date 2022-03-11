import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="">
     
      <Navbar className="navbar-toggler "  expand="sm" >
        
          <Navbar.Toggle aria-controls="responsive-navbar " />
          <Navbar.Collapse  id="responsive-navbar-nav ">
            <Nav>
              <NavLink className="nav-link navbar-brand ms-4" to="/">
                Refugees Welcome
              </NavLink>
              <ul className="navbar-nav ">
              <li className="nav-item">
                      <NavLink className="nav-link " to="/">
                        Shelters
                      </NavLink>
                    </li>
                {isLoggedIn &&
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/shelter/new">
                        list Shelter
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/refugee/">
                        Refugees
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/refugee/new">
                        list Refugee
                      </NavLink>
                    </li>
                    
                  
                    
                  </>
                }
                
                  </ul>
            </Nav>
          </Navbar.Collapse>
          <ul className='navbar-nav me-4'>
          {isLoggedIn &&  <>
          <li className="nav-item">
                      <NavLink className="nav-link" to="/profile">
                        USER
                      </NavLink>
                    </li>
                    
          <div className='nav navbar-nav navbar-right'>
                    <button className='btn btn-primary p-1 t logOutButton' onClick={logOutUser}>Logout</button>
                    </div></>}
                   
        {!isLoggedIn && <>
        
                
                  
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
                  
                  </>
                  }</ul>
      </Navbar>
      
    </div>
  );
}

export default Navigation;