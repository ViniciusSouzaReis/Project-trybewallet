import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../redux/store';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      expenses: [],
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    const state = store.getState();
    const { wallet: { expenses } } = state;
    this.setState({ expenses });
  }

  componentDidUpdate() {
    if (this.mounted) {
      store.subscribe(() => {
        const state = store.getState();
        const { wallet: { expenses } } = state;
        this.setState({ expenses });
      });
    }
  }

  render() {
    const { email } = this.props;
    const { expenses } = this.state;
    return (
      <div>
        <div>TrybeWallet</div>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">
          {expenses
            .reduce((acc, { value, currency, exchangeRates }) => (
              acc + (Number(value) * Object.entries(exchangeRates)
                .find((e) => e[0] === currency)[1].ask)), 0).toFixed(2)}

        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
