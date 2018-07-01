import * as actionTypes from '../actions/actionTypes';

const initialState = {
  validName: false,
  validBuy: false,
  validSell: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VALIDATE_MODAL:
      if (action.input.option === 'name') {
        return {
          ...state,
          validName: true
        };
      } else if (action.input.option === 'buy') {
        return {
          ...state,
          validBuy: true
        };
      } else {
        return {
          ...state,
          validSell: true
        };
      }

    case actionTypes.INVALIDATE_MODAL:
      if (action.value === 'name') {
        return {
          ...state,
          validName: false
        };
      } else if (action.value === 'buy') {
        return {
          ...state,
          validBuy: false
        };
      } else {
        return {
          ...state,
          validSell: false
        };
      }

    default:
      return state;
  }
};

export default reducer;
