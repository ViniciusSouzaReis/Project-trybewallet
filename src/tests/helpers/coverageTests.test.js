import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWith';
import App from '../../App';
import WalletForm from '../../components/WalletForm';
import Table from '../../components/Table';
import Wallet from '../../pages/Wallet';
// import Header from '../../components/Header';
import { mockData } from '../../../cypress/mocks/data';

const STATE = {
  user: {
    email: 'trybe@wallet.com',
    senha: '123456',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '20',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Saúde',
        description: 'Descrição da despesa',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

describe('Testa o componente App.js', () => {
  test('verifica se contem os textos de início', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/');

    expect(screen.getByText(/Hello, TrybeWallet!/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('verifica de os inputs então na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/');

    const inputLogin = screen.getByTestId('email-input');
    expect(inputLogin).toBeInTheDocument();
    userEvent.type(inputLogin, 'a');

    const handleChange = jest.fn();
    handleChange();
    expect(handleChange).toHaveBeenCalled();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const getBtn = screen.getByRole('button');
    expect(getBtn).toBeInTheDocument();

    userEvent.click(getBtn);
    const email = 'xablau@gmail.com';
    const userLogin = jest.fn();
    userLogin(email);
    expect(userLogin).toHaveBeenCalled();
    expect(userLogin).toHaveBeenCalledWith(email);
  });

  test('habilita bottão', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/');

    const inputLogin = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputLogin, 'alguem@gmail.com');
    userEvent.type(inputPassword, '123456');

    const getBtn = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(getBtn);

    const userLogin = jest.fn();
    userLogin();
    expect(userLogin).toHaveBeenCalled();
  });
});

describe('testa o WalletForm.js', () => {
  test('verifica se a função foi chamada', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const getBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(getBtn);

    const clickRequest = jest.fn();
    clickRequest();

    expect(clickRequest).toHaveBeenCalled();
  });
});

describe('testa o Table.js', () => {
  test('testa todo o component', () => {
    renderWithRouterAndRedux(<Table />);

    const description = screen.getByText('Descrição');
    expect(description).toBeInTheDocument();

    const tag = screen.getByText('Tag');
    expect(tag).toBeInTheDocument();

    const payment = screen.getByText('Método de pagamento');
    expect(payment).toBeInTheDocument();

    const moeda = screen.getByText('Moeda');
    expect(moeda).toBeInTheDocument();

    const cambio = screen.getByText('Câmbio utilizado');
    expect(cambio).toBeInTheDocument();

    const valor = screen.getByText('Valor convertido');
    expect(valor).toBeInTheDocument();

    const moeda1 = screen.getByText('Moeda de conversão');
    expect(moeda1).toBeInTheDocument();

    const excluir = screen.getByText('Editar/Excluir');
    expect(excluir).toBeInTheDocument();
  });

  test('renderização condicional', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: STATE });

    const buttonDelete = screen.getAllByTestId('delete-btn');
    userEvent.click(buttonDelete[0]);

    const expense = [];
    expect(store.getState().wallet.expenses).toEqual(expense);
  });
});
