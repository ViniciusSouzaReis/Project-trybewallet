import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies,
  saveExpentContent } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  handleClick = async () => {
    const { dispatch } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    dispatch(saveExpentContent(
      id,
      value,
      description,
      currency,
      method,
      tag,
    ));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    }));
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        <label htmlFor="input-expense">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            id="input-expense"
            onChange={ this.handleChange }
            min={ 0 }
          />
        </label>
        <label htmlFor="input-description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            id="input-description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="select-currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="select-currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((currencie, index) => (
              <option key={ index } value={ currencie }>{currencie}</option>
            ))}

          </select>
        </label>
        <label htmlFor="method-method">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="payment-method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
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
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
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
