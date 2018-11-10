import * as actionTypes from '../actions/actionTypes';

const initialState = {
  validForm: false,
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
      return {
        ...state,
        [action.input.option]: action.input.value
      };

    case actionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.value
      };
    case actionTypes.RESET_MODAL:
      return {
        ...state,
        validForm: false,
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
