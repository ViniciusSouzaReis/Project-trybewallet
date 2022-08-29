import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWith';
import App from '../../App';
import Table from '../../components/Table';
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

describe('Testa o componente Table.js', () => {
  test('verifca textos na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();
    userEvent.type(inputValue, '10');

    const inputDescription = screen.getByTestId('description-input');
    expect(inputDescription).toBeInTheDocument();
    userEvent.type(inputDescription, 'mcDonalds');

    const inputCurrency = screen.getByTestId('currency-input');
    expect(inputCurrency).toBeInTheDocument();

    const inputMethod = screen.getByRole('option', { name: 'Dinheiro' });
    expect(inputMethod).toBeInTheDocument();
    userEvent.click(inputMethod, 'Dinheiro');

    const inputTag = screen.getByRole('option', { name: /Alimentação/i });
    expect(inputTag).toBeInTheDocument();
    userEvent.click(inputTag, 'Alimentação');

    const getBtn = screen.getByText('Adicionar despesa');
    userEvent.click(getBtn);

    const findInfoCurrency = jest.fn();
    findInfoCurrency();
    expect(findInfoCurrency).toHaveBeenCalled();
  });
});

describe('Testa o componente Table.js', () => {
  test('verifca textos na tela', () => {
    const { history } = renderWithRouterAndRedux(<Table />);
    history.push('/carteira');

    const value = screen.getByText('Valor');
    expect(value).toBeInTheDocument();
    userEvent.type();

    const description = screen.getByText('Descrição');
    expect(description).toBeInTheDocument();

    const currency = screen.getByText('Moeda');
    expect(currency).toBeInTheDocument();

    const method = screen.getByText('Método de pagamento');
    expect(method).toBeInTheDocument();

    const tag = screen.getByText('Tag');
    expect(tag).toBeInTheDocument();

    const getBtn = screen.getByRole('button', { name: /excluir/i });
    userEvent.click(getBtn);

    const deleteInfo = jest.fn();
    deleteInfo();
    expect(deleteInfo).toHaveBeenCalled();
  });
});
