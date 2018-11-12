import * as actionTypes from '../actions/actionTypes';

const initialState = {
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
      // console.log('wowser');
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
      console.log(state);

      return {
        ...state,
        buyPrice: '',
        sellPrice: '',
        buyDate: '',
        sellDate: '',
        name: '',
        category: 'shoes'
      };

    default:
      return state;
  }
};

export default reducer;
