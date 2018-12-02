import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userId: null,
  user: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.userId,
        user: action.user
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        user: null
      };

    default:
      return state;
  }
};

export default reducer;
