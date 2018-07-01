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

export const validateModal = input => {
  return {
    type: actionTypes.VALIDATE_MODAL,
    input
  };
};
export const invalidateModal = value => {
  return {
    type: actionTypes.INVALIDATE_MODAL,
    value
  };
};
