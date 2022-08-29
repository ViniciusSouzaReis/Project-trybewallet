import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  findInfoCurrency = (param, paramtwo) => {
    const newArray = param.map((element) => Object.values(element.exchangeRates));
    if (newArray.length >= 1) {
      const findName = newArray[0].find((element) => element.code === paramtwo);
      return ({
        cursiveName: findName.name,
        ask: findName.ask,
      });
    }
  };

  render() {
    const { expenses } = this.props;
    const result = expenses.map((element) => this
      .findInfoCurrency(expenses, element.currency));
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((e, index) => (
              <tr key={ index }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{`${e.value}.00`}</td>
                <td>{result[index].cursiveName}</td>
                <td>{Number(result[index].ask).toFixed(2)}</td>
                <td>{(e.value * result[index].ask).toFixed(2)}</td>
                <td>Real</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Table);
