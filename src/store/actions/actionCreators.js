import * as actionTypes from './actionTypes';

export const setUser = (userId, user) => {
  return {
    type: actionTypes.SET_USER,
    userId,
    user
  };
};

export const logout = () => {
  return {
    type: actionTypes.USER_LOGOUT
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
