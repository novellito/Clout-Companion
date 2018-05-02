import React from 'react';
import { Navbar, NavItem } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import './AppNavbar.css';
const AppNavbar = () => {
  return (
    <Navbar brand="logo" className="navbar" right>
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
        <NavLink activeClassName="nav-active" to="/login">
          Login
        </NavLink>
      </li>
    </Navbar>
  );
};

export default AppNavbar;