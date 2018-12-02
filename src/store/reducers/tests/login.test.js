import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as actionCreators from '../../actions/actionCreators';
import * as actionTypes from '../../actions/actionTypes';

configure({ adapter: new Adapter() });

describe('Login Reducer', () => {
  it('should set the users login information', () => {
    const userId = '1234';
    const user = 'test user';

    const expectedAction = {
      type: actionTypes.SET_USER,
      userId: '1234',
      user: 'test user'
    };
    expect(actionCreators.setUser(userId, user)).toEqual(expectedAction);
  });

  it('should reset the users login information', () => {
    const expectedAction = {
      type: actionTypes.USER_LOGOUT
    };

    expect(actionCreators.logout()).toEqual(expectedAction);
  });
});
