import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as actionCreators from '../../actions/actionCreators';
import * as actionTypes from '../../actions/actionTypes';
configure({ adapter: new Adapter() });

describe('Modal Reducer', () => {
  it('should set the users login information', () => {});
});
