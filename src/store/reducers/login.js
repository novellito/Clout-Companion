import * as actionTypes from '../actions/actionTypes';

const initialState = {
  // isLoggedIn: localStorage.length > 0 ? true : false,
  isLoggedIn: false,
  userId: null,
  user: null,
  needToRelog: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.userId,
        user: action.user,
        needToRelog: false
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        user: null
      };
    case actionTypes.USER_RELOG:
      localStorage.clear();
      return {
        ...state,
        needToRelog: true
      };
    default:
      return state;
  }
};

export default reducer;
