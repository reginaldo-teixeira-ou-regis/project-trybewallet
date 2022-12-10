import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, totalExpenses } = this.props;
    return (
      <div>
        <h4 data-testid="email-field">{ userEmail }</h4>
        <span data-testid="total-field">{ totalExpenses.toFixed(2) }</span>
        <span data-testid="header-currency-field"> BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  userEmail: globalState.user.email,
  userExpenses: globalState.wallet.expenses,
  totalExpenses: globalState.wallet.expenses
    .reduce((total, curr) => (
      total + (+curr.value * curr.exchangeRates[curr.currency].ask)
    ), 0),
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
