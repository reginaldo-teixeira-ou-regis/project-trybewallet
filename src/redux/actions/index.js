export const ADD_USER = 'ADD_USER';
export const SELECT_CURRENCIES = 'SELECT_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addUser = (email) => ({
  type: ADD_USER,
  payload: email,
});

export const selectCurrencies = (currencies) => ({
  type: SELECT_CURRENCIES,
  payload: currencies,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export const saveExpenseForm = (infos) => async (dispatch) => {
  const fetchCurr = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesJson = await fetchCurr.json();
  delete currenciesJson.USDT;
  dispatch(addExpenses({ ...infos, exchangeRates: currenciesJson }));
};
