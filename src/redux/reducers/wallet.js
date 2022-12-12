import {
  ADD_EXPENSES, SELECT_CURRENCIES, DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EXPENSE_EDITED,
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
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SAVE_EXPENSE_EDITED:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === Number(state.idToEdit)
          ? ({ id: expense.id, ...action.payload, exchangeRates: expense.exchangeRates })
          : expense)),
      editor: false,
    };
  default:
    return { ...state };
  }
}

export default walletReducer;
