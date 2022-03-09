import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="d-flex justify-content-between">
     
      <Navbar className="navbar-toggler" fixed="top" expand="sm" >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              {/* <img className= "icon" src="../public/images/page-icon.png" alt=""/> */}
              <NavLink className="nav-link navbar-brand" to="/">
                Refugees Welcome
              </NavLink>
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
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
                  </li></>}
                {isLoggedIn &&
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/refugee/">
                        Refugees
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/refugee/new">
                        create Refugee
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/shelter/new">
                        create Shelter
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/profile">
                        User
                      </NavLink>
                    </li>
                    &nbsp;
                    <button className='btn btn-primary p-1 t logOutButton' onClick={logOutUser}>Logout</button>
                    &nbsp;
                    {/* <span>{user && user.username}</span> */}
                  </>
                }


              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  );
}

export default Navigation;