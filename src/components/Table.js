import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map(({
                id,
                description,
                tag,
                method,
                value,
                exchangeRates,
                currency,
              }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>
                    {Number(exchangeRates[currency].ask).toFixed(2)}
                  </td>
                  <td>
                    {Number((exchangeRates[currency].ask)
                     * value).toFixed(2)}
                  </td>
                  <td>Real</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (stateGlobal) => ({
  expenses: stateGlobal.wallet.expenses,
});

Table.propTypes = {
  /* dispatch: propTypes.func.isRequired, */
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Table);
