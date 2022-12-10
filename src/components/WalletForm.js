import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenseForm } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  clearFields = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(saveExpenseForm(expense));
    this.clearFields();
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies } = this.props;
    return (
      <div className="walletContainer">
        <form onSubmit={ this.handleSubmit } className="formWallet">
          <label htmlFor="value">
            <span>Valor: </span>
            <input
              type="number"
              name="value"
              id="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            <span>Moeda: </span>
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((coin) => (
                  <option
                    key={ coin }
                    value={ coin }
                  >
                    {coin}
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            <span>Método de pagamento: </span>
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option defaultValue="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <span>Categoria: </span>
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option defaultValue="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
          <label htmlFor="description">
            <span>Descrição: </span>
            <input
              type="text"
              name="description"
              id="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (stateGlobal) => ({
  currencies: stateGlobal.wallet.currencies,
  expenses: stateGlobal.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
