import { API_REQUEST, SAVE_CONTENT } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalExpenses: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case API_REQUEST:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_CONTENT:
    return {
      ...state,
      expenses: [action.expenses],
    };
  default:
    return state;
  }
}

export default wallet;
