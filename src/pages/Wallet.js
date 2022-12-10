import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import currApi from '../services/fetchCurrencies';
import { selectCurrencies } from '../redux/actions';

class Wallet extends React.Component {
  state = {
    currencies: [],
  };

  componentDidMount() {
    this.getCoins();
  }

  setCoinsGlobalState = () => {
    const { dispatch } = this.props;
    const { currencies } = this.state;
    dispatch(selectCurrencies(currencies));
  };

  getCoins = async () => {
    const currencies = await currApi.fetchCurrencies();
    this.setState({
      currencies,
    }, this.setCoinsGlobalState);
  };

  render() {
    return (
      <div>
        TrybeWallet
        <Header />
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (stateGlobal) => ({
  ...stateGlobal.user,
  ...stateGlobal.wallet,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
