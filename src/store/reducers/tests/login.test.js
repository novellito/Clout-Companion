import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as actionTypes from "../login";

configure({ adapter: new Adapter() })

describe('Login Reducer', () => {

    it('should set the users login information', () => {
        const user = {
            userId: '1234',
            user: 'test user'
        }
        const expectedAction = {
            type: actionTypes.USER_LOGIN,
            userData: { userId: '1234', user: 'test user' }
        }
        console.log(dispatch({ type: actionTypes.USER_LOGIN }));
        // expect(actionTypes.USER_LOGIN).toEqual(expectedAction)
    })

})
