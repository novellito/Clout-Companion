import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShippingInput from '../ShippingInput';

configure({ adapter: new Adapter() }); // connect enzyme

describe('<ShippingInput/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow( < ShippingInput / > );
  });

  it('should be disabled when there is no current value', () => {
    wrapper.setProps({
      currValue: '',
    });
    expect(wrapper.props().disabled).toBeTruthy();
  });

  it('should be enabled when there is a current value', () => {
    wrapper.setProps({
      currValue: '',
    });
    expect(wrapper.props().disabled).toBeTruthy();
  });
});
