import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userId: '',
  user: ''
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.userData.userId,
        user: action.userData.user
      };
  }
  return state;
};

export default reducer;
