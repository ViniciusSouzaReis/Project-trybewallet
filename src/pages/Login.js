import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLoginAction } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validationEmail: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    const { email } = this.state;
    const checkEmail = this.validEmail(email);
    this.setState((prevState) => ({
      email: prevState.email,
      password: prevState.password,
      validationEmail: checkEmail,
    }));
  };

  validEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  render() {
    const { email, password, validationEmail } = this.state;
    const { userLogin } = this.props;
    const checkPasswordLength = 6;
    const checkDisable = !validationEmail || password.length < checkPasswordLength;
    return (
      <div>
        <div>Hello, TrybeWallet!</div>
        <div>Login</div>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ checkDisable }
            onClick={ () => userLogin(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(userLoginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
