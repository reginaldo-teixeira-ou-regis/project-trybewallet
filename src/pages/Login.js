import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;
    const { dispatch, history } = this.props;
    return (
      <div className="Login">
        <h3 className="text-center">Login</h3>
        <form className="formLogin">
          <label htmlFor="email">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              id="email"
              data-testid="email-input"
              onChange={ ({ target }) => this.setState({ email: target.value }) }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              id="password"
              data-testid="password-input"
              onChange={ ({ target }) => this.setState({ password: target.value }) }
            />
          </label>
          <button
            type="button"
            onClick={ () => dispatch(addUser({ email, password }))
              && history.push('/carteira') }
            disabled={ password.length < +'6' || !email.match(
              /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
            ) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect()(Login);
