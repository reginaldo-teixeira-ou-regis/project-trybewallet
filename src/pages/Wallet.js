import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import currApi from '../services/fetchCurrency';
import { selectCurrencies } from '../redux/actions';

class Wallet extends React.Component {
  state = {
    currencies: [],
  };

  componentDidMount() {
    this.getCurrencies();
  }

  saveCoinsGlobalState = () => {
    const { dispatch } = this.props;
    const { currencies } = this.state;
    dispatch(selectCurrencies(currencies));
  };

  getCurrencies = async () => {
    const currencies = await currApi.fetchCurrencies();
    this.setState({
      currencies,
    }, this.saveCoinsGlobalState);
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

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
