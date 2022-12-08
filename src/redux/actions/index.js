export const LOGIN = 'LOGIN';
export const WALLET = 'WALLET';

export const login = (value) => ({
  type: LOGIN,
  value,
});

export const wallet = (value) => ({
  type: WALLET,
  value,
});
