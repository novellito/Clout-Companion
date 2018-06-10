import React from 'react';
import { Navbar } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/ccLogo.png';
import './AppNavbar.css';
const AppNavbar = () => {
  const Img = <img className="cc-logo" alt="clout companion logo" src={Logo} />;
  return (
    <Navbar
      brand={Img}
      className="navbar"
      alt="clout companion logo (link to home page)"
      right
    >
      <li>
        <NavLink exact activeClassName="nav-active" to="/">
          Calculator
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="nav-active" to="/resources">
          Resources
        </NavLink>
      </li>
      <li>
        {/* <NavLink activeClassName="nav-active" to="/login">
          Login
        </NavLink> */}
        <NavLink
          activeClassName="nav-active"
          to={localStorage.length > 0 ? '/dashboard' : '/login'}
        >
          {localStorage.length > 0 ? 'Dashboard' : 'Login'}
        </NavLink>
      </li>
    </Navbar>
  );
};

export default AppNavbar;
