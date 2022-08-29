// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const API_REQUEST = 'API_REQUEST';
export const SAVE_CONTENT = 'SAVE_CONTENT';
export const DELETE_INFO = 'DELETE_INFO';

export const userLoginAction = (email) => ({
  type: USER_LOGIN,
  email,
});

export const deleteInfoAction = (payload) => ({
  type: DELETE_INFO,
  payload,
});

export const requestCurrenciesAction = (payload) => ({
  type: API_REQUEST,
  payload,
});

export const saveExpentContent = (array, info) => ({
  type: SAVE_CONTENT,
  expenses: {
    id: array[0],
    value: array[1],
    currency: array[3],
    method: array[4],
    tag: array[5],
    description: array[2],
    exchangeRates: info,
  },
});

export function getCurrencies() {
  return async (dispatch) => {
    try {
      const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

      const request = await fetch(CURRENCIES_API);
      const response = await request.json();
      const filtered = Object.keys(response).filter((e) => e !== 'USDT');
      dispatch(requestCurrenciesAction(filtered));
    } catch (error) {
      console.log(error);
    }
  };
}

export function clickRequest(...infos) {
  return async (dispatch) => {
    try {
      const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

      const request = await fetch(CURRENCIES_API);
      const response = await request.json();
      const getInfo = [...infos];
      dispatch(saveExpentContent(getInfo, response));
    } catch (error) {
      console.log(error);
    }
  };
}
