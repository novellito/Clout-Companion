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

export const updateBuyPrice = value => {
  return {
    type: actionTypes.UPDATE_BUYPRICE,
    value
  };
};

export const updateSellPrice = value => {
  return {
    type: actionTypes.UPDATE_SELLPRICE,
    value
  };
};

export const setCalendarBuyDate = value => {
  return {
    type: actionTypes.SET_BUYDATE,
    value
  };
};

export const setCalendarSellDate = value => {
  return {
    type: actionTypes.SET_SELLDATE,
    value
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
