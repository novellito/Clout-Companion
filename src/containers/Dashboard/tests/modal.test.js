import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalContainer } from '../ModalContainer';
import { Input } from 'react-materialize';
import NumberFormat from 'react-number-format';

configure({ adapter: new Adapter() });

describe('<ModalContainer/>', () => {
  const props = {
    name: 'yeezy350',
    buyPrice: '240',
    sellPrice: '300',
    buyDate: ['11', '09', '2018'],
    sellDate: ['11', '12', '2018'],
    category: 'shoes'
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalContainer {...props} />);
  });

  it('should render the form fields', () => {
    expect(wrapper.find(Input).length).toEqual(3);
    expect(wrapper.find(NumberFormat).length).toEqual(2);
  });
});
