import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Dashboard } from '../Dashboard';
import 'jest-localstorage-mock';

configure({ adapter: new Adapter() })

describe('<Dashboard/>', () => {

    let wrapper;
    beforeEach(() => {
        localStorage.setItem('jwt', '1abvi2cf23')
        localStorage.setItem('uid', '1223')
        wrapper = shallow(<Dashboard isLog={true} />)
    })

    it('should render the dashboard when logged in', () => {
        expect(wrapper).toHaveLength(1)
    })

})
