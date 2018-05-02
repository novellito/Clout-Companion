import React from 'react';
import { Navbar, NavItem } from 'react-materialize';
const AppNavbar = () => {
  return (
    <Navbar brand="logo" className="navbar" right>
      <NavItem onClick={() => console.log('test click')}>
        Getting started
      </NavItem>
      <NavItem href="components.html">Components</NavItem>
    </Navbar>
  );
};

export default AppNavbar;
