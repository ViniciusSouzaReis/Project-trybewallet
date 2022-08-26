// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const API_REQUEST = 'API_REQUEST';

export const userLoginAction = (email) => ({
  type: USER_LOGIN,
  email,
});

export const requestCurrenciesAction = (payload) => ({
  type: API_REQUEST,
  payload,
});

export function getCurrencies() {
  return async (dispatch) => {
    try {
      const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

      const request = await fetch(CURRENCIES_API);
      const response = await request.json();
      const initials = Object.values(response).map((coin) => coin.code);
      const filtered = initials.filter((cn, index) => cn.code !== 'USDT' && index !== 0);
      console.log(filtered);
      dispatch(requestCurrenciesAction(filtered));
    } catch (error) {
      console.log(error);
    }
  };
}
