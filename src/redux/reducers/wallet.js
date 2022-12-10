import {
  ADD_EXPENSES, SELECT_CURRENCIES, DELETE_EXPENSE, /* EDIT_EXPENSE, */
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SELECT_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  /* case EDIT_EXPENSE:
    return {
      ...state,
      expenseEdit: action.payload,
    }; */
  default: return state;
  }
}

export default walletReducer;
