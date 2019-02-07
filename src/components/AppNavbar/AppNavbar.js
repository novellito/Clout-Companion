import React from 'react';
import { Navbar, NavItem } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/ccLogo.png';
import './AppNavbar.css';

export const AppNavbar = props => {
  const Img = <img className="cc-logo" alt="clout companion logo" src={Logo} />;

  const logout = () => {
    localStorage.clear();
    props.history.push('/login');
  };
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
        <NavLink
          activeClassName="nav-active"
          to={localStorage.length > 0 ? '/dashboard' : '/login'}
        >
          {localStorage.length > 0 ? 'Dashboard' : 'Login'}
        </NavLink>
      </li>
      {localStorage.length > 0 ? (
        <NavItem onClick={() => logout()}>Logout</NavItem>
      ) : (
        ''
      )}
    </Navbar>
  );
};

export default AppNavbar;
