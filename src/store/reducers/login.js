import * as actionTypes from '../actions/actionTypes';

const initialState = {
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
        userId: action.userData.userId,
        user: action.userData.user,
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
