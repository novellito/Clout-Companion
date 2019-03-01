import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calculator from './Calculator';
import CalculatorInput from '../../components/CalculatorInput/CalculatorInput';

configure({ adapter: new Adapter() }); // connect enzyme

// Test cases to make sure calculator works for each component
describe('<Calculator/>', () => {
  let wrapper;
  let data;
  beforeEach(() => {
    wrapper = shallow(<Calculator />);
    data = {
      target: {
        name: '',
        value: ''
      }
    };
  });

  it('should render 3 CalculatorInput components', () => {
    expect(wrapper.find(CalculatorInput)).toHaveLength(3);
  });

  it('should calculate paypal information', () => {
    data.target.name = 'Paypal';
    data.target.value = '200';

    wrapper.instance().setValue(data);
    const paypalState = wrapper.state('PaypalResult');
    expect(paypalState).toEqual({
      fees: '6.10',
      receive: '193.90',
      askFor: '206.28'
    });
  });

  it('should calculate grailed information', () => {
    data.target.name = 'Grailed';
    data.target.value = '200';

    wrapper.instance().setValue(data);
    const grailedState = wrapper.state('GrailedResult');
    expect(grailedState).toEqual({
      fees: '6.10',
      receive: '181.90',
      grailedFees: '12.00',
      askFor: '219.87'
    });
  });
  it('should calculate stockx information', () => {
    data.target.name = 'Stockx';
    data.target.value = '200';

    wrapper.instance().setValue(data);
    const stockxState = wrapper.state('StockxResult');
    expect(stockxState).toEqual({
      receive: '175.00',
      askFor: 229,
      transactionFee: 19,
      payProcFee: 6
    });
  });
});
