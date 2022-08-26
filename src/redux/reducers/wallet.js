import { API_REQUEST } from '../actions/index';

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
  default:
    return state;
  }
}

export default wallet;
