import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as actionCreators from '../../actions/actionCreators';
import * as actionTypes from '../../actions/actionTypes';
import reducer from '../../reducers/modal';
configure({ adapter: new Adapter() });

describe('Modal Reducer', () => {
  it('should update the form accordingly', () => {
    // next it - enable validform
    let initialState = {
      name: '',
      buyPrice: '',
      sellPrice: '',
      buyDate: '',
      sellDate: '',
      category: 'shoes'
    };

    const expectedUpdateFormAction = (option, value) => ({
      type: actionTypes.UPDATE_FORM,
      input: {
        option,
        value
      }
    });

    let nextState = reducer(
      initialState,
      expectedUpdateFormAction('name', 'yeezy')
    );

    /// test name change
    expect(
      reducer(initialState, expectedUpdateFormAction('name', 'yeezy')).name
    ).toEqual(nextState.name);

    nextState = {
      ...nextState,
      buyPrice: '200'
    };

    // change the buy Price
    expect(
      reducer(initialState, expectedUpdateFormAction('buyPrice', '200'))
        .buyPrice
    ).toEqual(nextState.buyPrice);

    nextState = {
      ...nextState,
      sellPrice: '250'
    };

    // change the sell Price
    expect(
      reducer(initialState, expectedUpdateFormAction('sellPrice', '250'))
        .sellPrice
    ).toEqual(nextState.sellPrice);

    nextState = {
      ...nextState,
      buyDate: ['11', '05', '2018']
    };

    // change the buy Date
    expect(
      reducer(
        initialState,
        expectedUpdateFormAction('buyDate', ['11', '05', '2018'])
      ).buyDate
    ).toEqual(nextState.buyDate);

    nextState = {
      ...nextState,
      sellDate: ['11', '15', '2018']
    };

    // change the sell Date
    expect(
      reducer(
        initialState,
        expectedUpdateFormAction('sellDate', ['11', '15', '2018'])
      ).sellDate
    ).toEqual(nextState.sellDate);

    console.log(nextState);
  });

  it('should set the category accordingly', () => {
    const expectedUpdateFormAction = {
      type: actionTypes.SET_CATEGORY,
      value: 'clothes'
    };

    expect(reducer(null, expectedUpdateFormAction).category).toEqual('clothes');
  });

  //   const expectedResetModalAction = {};
});
