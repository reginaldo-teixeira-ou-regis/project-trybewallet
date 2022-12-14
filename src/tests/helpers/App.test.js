import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import mockData from './mockData';

const emailUser = 'reginaldoteixeira@gmail.com';
const passwordUser = '1r2e3g';

afterEach(() => jest.clearAllMocks());

describe('Verify if the login page is rendered correctly', () => {
  it('Verify if the Login page is rendered on Home', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const titleLogin = screen.getByRole('heading', { level: 3, name: /login/i });

    expect(titleLogin).toBeInTheDocument();
  });

  it('Verify if Login components are rendered on screen', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const btnLogin = screen.getByRole('button', {
      name: /entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });

  it('Verify if the button is disabled when the password has less than 6 characters', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const btnLogin = screen.getByRole('button', {
      name: /entrar/i });

    const passwordMinusOf6Digits = '1234';

    userEvent.type(inputEmail, emailUser);
    userEvent.type(inputPassword, passwordMinusOf6Digits);

    expect(inputEmail.value).toBe(emailUser);
    expect(inputPassword.value).toBe(passwordMinusOf6Digits);
    expect(btnLogin.disabled).toBe(true);
  });

  it('Verify if the button is disabled if the email is in an invalid format', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const btnLogin = screen.getByRole('button', {
      name: /entrar/i });

    const notEmailFormat = 'reginaldoteixeira_gmail';

    userEvent.type(inputEmail, notEmailFormat);
    userEvent.type(inputPassword, passwordUser);

    expect(inputEmail.value).toBe(notEmailFormat);
    expect(inputPassword.value).toBe(passwordUser);
    expect(btnLogin.disabled).toBe(true);
  });

  it('Verify if it is possible to type in the inputs and if the button is clickable', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const btnLogin = screen.getByRole('button', {
      name: /entrar/i });

    userEvent.type(inputEmail, emailUser);
    userEvent.type(inputPassword, passwordUser);

    expect(btnLogin.disabled).toBe(false);
    expect(inputEmail.value).toBe(emailUser);
    expect(inputPassword.value).toBe(passwordUser);

    userEvent.click(btnLogin);

    history.push('/carteira');

    const idEmail = screen.getByTestId(/email-field/i);

    expect(idEmail).toBeInTheDocument();
  });

  it('Verify if you save the email in the application state, with the email key, as soon as the user logs in', () => {
    const initialState = {
      user: {
        email: 'reginaldoteixeira@gmail.com',
      },
      wallet: {
        currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const emailLogged = screen.getByText(/reginaldoteixeira@gmail.com/i);
    const totalExpense = screen.getByTestId(/total-field/i);
    const currencyType = screen.getByTestId(/header-currency-field/i);

    expect(emailLogged).toBeInTheDocument();
    expect(totalExpense).toBeInTheDocument();
    expect(currencyType).toBeInTheDocument();
  });
});

describe('Verify if the WalletForm component is rendered correctly', () => {
  it('Verify if the field to add the expense amount has data-testid="value-input"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByTestId(/value-input/i);

    expect(inputValue).toBeInTheDocument();
  });

  it('Verify if the field to add the expense description has data-testid="description-input', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputDescription = screen.getByTestId(/description-input/i);

    expect(inputDescription).toBeInTheDocument();
  });

  it('Verify if the field to select which currency the expense will be recorded in has data-testid="currency-input"', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputCurrency = screen.getByTestId(/currency-input/i);

    expect(inputCurrency).toBeInTheDocument();
  });

  it('Verify if the field to select which payment method will be used has data-testid="method-input"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputMethodPayment = screen.getByTestId(/method-input/i);

    expect(inputMethodPayment).toBeInTheDocument();
    expect(inputMethodPayment).toHaveTextContent('Dinheiro');
  });

  it('Verify if the field to select a category (tag) of the expense has the data-testid="tag-input"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputTag = screen.getByTestId(/tag-input/i);

    expect(inputTag).toBeInTheDocument();
    expect(inputTag).toHaveTextContent('Alimentação');
  });

  it('Verify that a button with the text "Add Expense" render.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByTestId('value-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethodPayment = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');
    const inputDescription = screen.getByTestId('description-input');
    const btnAddExpense = screen.getByText(/adicionar despesa/i);

    expect(inputValue).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethodPayment).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(btnAddExpense).toBeInTheDocument();

    userEvent.type(inputValue, 11);
    userEvent.type(inputCurrency, 'USD');
    userEvent.type(inputMethodPayment, 'Dinheiro');
    userEvent.type(inputTag, 'Alimentação');
    userEvent.type(inputDescription, 'onze');
    userEvent.click(btnAddExpense);

    const descriptionTable = screen.findByRole('columnheader', { name: /descrição/i });
    const tagTable = screen.findByRole('columnheader', { name: /tag/i });
    const methodPaymentTable = screen.findByRole('columnheader', { name: /método de pagamento/i });
    const valueTable = screen.findByRole('columnheader', { name: /valor/i });
    const currencyTable = screen.findByRole('columnheader', { name: /moeda/i });
    const exchangeUsedTable = await screen.findByRole('columnheader', { name: /câmbio utilizado/i });
    const convertedValueTable = await screen.findByRole('columnheader', { name: /Valor convertido/i });
    const conversionCurrencyTable = screen.findByRole('columnheader', { name: /Moeda de conversão/i });
    const btnDelete = screen.findByRole('button', { name: /deletar/i });
    const btnEdit = await screen.findByRole('button', { name: /editar/i });

    expect(descriptionTable).toBeInTheDocument();
    expect(tagTable).toBeInTheDocument();
    expect(methodPaymentTable).toBeInTheDocument();
    expect(valueTable).toBeInTheDocument();
    expect(currencyTable).toBeInTheDocument();
    expect(exchangeUsedTable).toBeInTheDocument();
    expect(convertedValueTable).toBeInTheDocument();
    expect(conversionCurrencyTable).toBeInTheDocument();
    expect(btnDelete).toBeInTheDocument();
    expect(btnEdit).toBeInTheDocument();
  });
});
