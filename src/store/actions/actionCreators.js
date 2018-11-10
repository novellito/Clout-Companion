import * as actionTypes from './actionTypes';

export const login = (userId, user) => {
  return {
    type: actionTypes.USER_LOGIN,
    userId,
    user
  };
};

export const logout = () => {
  return {
    type: actionTypes.USER_LOGOUT
  };
};
export const relog = () => {
  return {
    type: actionTypes.USER_RELOG
  };
};

export const updateForm = input => {
  return {
    type: actionTypes.UPDATE_FORM,
    input
  };
};

export const setCategory = value => {
  return {
    type: actionTypes.SET_CATEGORY,
    value
  };
};
export const resetModal = () => {
  return {
    type: actionTypes.RESET_MODAL
  };
};
