import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <label htmlFor="input-expense">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            name="input-expense"
            id="input-expense"
            min={ 0 }
          />
        </label>
        <label htmlFor="input-description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="input-description"
            id="input-description"
          />
        </label>
        <label htmlFor="select-currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="select-currency"
            name="select-currency"
          >
            { currencies.map((coin, index) => (
              <option key={ index } value={ coin }>{coin}</option>
            ))}

          </select>
        </label>
        <label htmlFor="payment-method">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="payment-method"
            name="payment-method"
          >
            <option value="money">Dinheiro</option>
            <option value="debit-card">Cartão de crédito</option>
            <option value="credit-card">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category-select">
          Categoria:
          <select
            data-testid="tag-input"
            id="category-select"
            name="category-select"
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Number).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(WalletForm);
