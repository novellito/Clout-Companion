import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from '../Login';
import 'jest-localstorage-mock';
import FacebookLogin from 'react-facebook-login';
import TwitterLogin from 'react-twitter-auth';

configure({ adapter: new Adapter() })

describe('<Login/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Login />)
        localStorage.clear()
    })
    it('Should render the fb login component ', () => {
        expect(wrapper.find(FacebookLogin)).toHaveLength(1);
    })

    it('Should render the twitter login component ', () => {
        expect(wrapper.find(TwitterLogin)).toHaveLength(1);
    })
})
