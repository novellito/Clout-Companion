import React from 'react';
import { Navbar } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/ccLogo.png';
import './AppNavbar.css';
const AppNavbar = () => {
  const Img = <img className="cc-logo" src={Logo} />;
  return (
    <Navbar brand={Img} className="navbar" right>
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
