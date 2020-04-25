import client from '../graphql/Apollo';

export const logOut = (): void => {
  localStorage.removeItem('token');
  client.resetStore();
};

export const logIn = (token: string): void => {
  localStorage.setItem('token', token);
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('token');
};
