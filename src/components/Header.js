import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <h4 data-testid="email-field">{ userEmail }</h4>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field"> BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  userEmail: globalState.user.email,
  userWallet: globalState.wallet,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
