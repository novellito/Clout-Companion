import * as actionTypes from '../actions/actionTypes';

const initialState = {
  validName: false,
  validBuy: false,
  validSell: false,
  buyPrice: '',
  sellPrice: '',
  buyDate: '',
  sellDate: '',
  category: 'shoes'
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
          validBuy: true,
          buyPrice: action.input.val
        };
      } else {
        return {
          ...state,
          validSell: true,
          sellPrice: action.input.val
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
          validBuy: false,
          buyPrice: ''
        };
      } else {
        return {
          ...state,
          validSell: false
        };
      }

    case actionTypes.UPDATE_BUYPRICE:
      return {
        ...state,
        buyPrice: action.value
      };

    case actionTypes.UPDATE_SELLPRICE:
      return {
        ...state,
        sellPrice: action.value
      };

    case actionTypes.SET_BUYDATE:
      return {
        ...state,
        buyDate: action.value
      };

    case actionTypes.SET_SELLDATE:
      return {
        ...state,
        sellDate: action.value
      };

    case actionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.value
      };

    default:
      return state;
  }
};

export default reducer;
