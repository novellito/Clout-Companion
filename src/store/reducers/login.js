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
        userId: action.userData.userId,
        user: action.userData.user
      };
    case actionTypes.USER_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        user: null
      };
  }
  return state;
};

export default reducer;
