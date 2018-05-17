import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShippingInput from './ShippingInput';

configure({ adapter: new Adapter() }); // connect enzyme

describe('<ShippingInput/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ShippingInput />);
  });

  it('should love', () => {
    wrapper.setProps({
      currValue: ''
    });
    expect(wrapper.find('#shipping')).toHaveLength(1);
  });
});
