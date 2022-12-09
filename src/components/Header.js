import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, userExpenses } = this.props;
    const totalExpenses = userExpenses
      .reduce((total, curr) => (
        total + (curr.value * curr.exchangeRates[curr.currency].ask)
      ), 0);
    return (
      <div>
        <h4 data-testid="email-field">{ userEmail || 0 }</h4>
        <span data-testid="total-field">{ totalExpenses.toFixed(2) }</span>
        <span data-testid="header-currency-field"> BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  userEmail: globalState.user.email,
  userExpenses: globalState.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userExpenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
