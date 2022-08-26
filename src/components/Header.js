import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <div>
        <div>TrybeWallet</div>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">{totalExpenses}</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

export default connect(mapStateToProps, null)(Header);
