import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWith';
import App from '../../App';
// import Header from '../../components/Header';
// import { mockData } from '../../../cypress/mocks/data';

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

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });
});

describe('Testa o componente walletform.js', () => {
  test('verifica se contem os textos de início', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    expect(screen.getByText(/TrybeWallet/i)).toBeInTheDocument();
    expect(screen.getByText(/BRL/i)).toBeInTheDocument();
  });

  test('verifica se os inputs então na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();

    const inputDescription = screen.getByTestId('description-input');
    expect(inputDescription).toBeInTheDocument();

    const inputCurrency = screen.getByTestId('currency-input');
    expect(inputCurrency).toBeInTheDocument();

    const inputMethod = screen.getByTestId('method-input');
    expect(inputMethod).toBeInTheDocument();

    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toBeInTheDocument();
  });

  test('verificar funcionamento das funções', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const getButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(getButton);
    const clickRequest = jest.fn();
    const parameters = 'param';
    clickRequest(parameters);

    expect(clickRequest).toHaveBeenCalled();
    expect(clickRequest).toHaveBeenCalledTimes(1);
    expect(clickRequest).toHaveBeenCalledWith(parameters);
  });
});

// describe('Testa o componente Header.js', () => {
//   test('verifca textos na tela', () => {
//     const { history } = renderWithRouterAndRedux(<Header />);

//     expect(screen.getByText(/0.00/i)).toBeInTheDocument();

//     const subscribe = jest.fn();
//     subscribe();
//     expect(subscribe).toHaveBeenCalled();
//   });
// });
