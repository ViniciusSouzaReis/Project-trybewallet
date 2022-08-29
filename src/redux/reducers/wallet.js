import { API_REQUEST, SAVE_CONTENT, DELETE_INFO } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_INFO:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
