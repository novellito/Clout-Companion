import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavItem } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import { AppNavbar } from './AppNavbar';
import 'jest-localstorage-mock'
configure({ adapter: new Adapter() })

describe('<AppNavbar/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<AppNavbar />)
    })
    it('Should render 3 Navlinks when logged out', () => {
        expect(wrapper.find(NavLink)).toHaveLength(3);
    })

    it('Should render a NavItem if logged in ', () => {
        // Navitem is rendered if there is something in local storage 
        localStorage.setItem('jwt', 'blah')
        const loggedInNav = shallow(<AppNavbar />)
        expect(loggedInNav.find(NavItem)).toHaveLength(1);
    })
})
