import * as actionTypes from '../actions/actionTypes';

const initialState = {
  validName: false,
  validBuy: false,
  validSell: false,
  name: '',
  buyPrice: '',
  sellPrice: '',
  buyDate: '',
  sellDate: '',
  category: 'shoes'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM:
      console.log(action.input.e.target);
      console.log(action.input.e.target.value);
      return {
        ...state,
        [action.input.option]: action.input.e.target.value
      };

    case actionTypes.VALIDATE_MODAL:
      if (action.input.option === 'name') {
        return {
          ...state,
          validName: true,
          name: action.input.val
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
          validName: false,
          name: ''
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
    case actionTypes.RESET_MODAL:
      return {
        ...state,
        validName: false,
        validBuy: false,
        validSell: false,
        buyPrice: '',
        sellPrice: '',
        buyDate: '',
        sellDate: '',
        name: ''
      };

    default:
      return state;
  }
};

export default reducer;