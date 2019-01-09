import * as actionTypes from '../actions/actionTypes';

const initialState = {
  name: '',
  buyPrice: '',
  sellPrice: '',
  buyDate: '',
  sellDate: '',
  category: 'shoes',
  editingIndex: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM:
      // console.log(action.input.value);
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
        buyPrice: '',
        sellPrice: '',
        buyDate: '',
        sellDate: '',
        name: '',
        category: 'shoes',
        editingIndex: null
      };
    case actionTypes.SET_ITEM_EDIT:
      return {
        ...state,
        editingIndex: action.index,
        buyPrice: action.value.buyPrice,
        sellPrice: action.value.sellPrice,
        buyDate: action.value.buyDate,
        sellDate: action.value.sellDate,
        name: action.value.name,
        category: action.value.category
      };

    default:
      return state;
  }
};

export default reducer;
