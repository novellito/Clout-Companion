import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CalculatorInput from '../CalculatorInput';
import { PaypalResult, GrailedResult, StockXResult } from '../CalculationResult';

configure({ adapter: new Adapter() }); // connect enzyme

// Test to ensure result components are rendered
describe('<CalculatorInput/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CalculatorInput />);
  });

  it('should render PaypalResult input', () => {
    wrapper.setProps({
      type: 'Paypal'
    });
    expect(wrapper.find(PaypalResult)).toHaveLength(1);
  });

  it('should render GrailedResult input', () => {
    wrapper.setProps({
      type: 'Grailed'
    });
    expect(wrapper.find(GrailedResult)).toHaveLength(1);
  });
  
  it('should render StockXResult input', () => {
    wrapper.setProps({
      type: 'Stockx'
    });
    expect(wrapper.find(StockXResult)).toHaveLength(1);
  });
});
