import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteInfoAction } from '../redux/actions/index';

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
    const { expenses, deleteInfo } = this.props;
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
              <tr key={ e.id }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{`${e.value}.00`}</td>
                <td>{result[index].cursiveName}</td>
                <td>{Number(result[index].ask).toFixed(2)}</td>
                <td>{(e.value * result[index].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    // onClick={}
                  >
                    Editar despesa
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteInfo(e.id) }
                  >
                    Excluir
                  </button>
                </td>
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

const mapDispatchToProps = (dispatch) => ({
  deleteInfo: (id) => dispatch(deleteInfoAction(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
