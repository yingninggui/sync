import client from '../graphql/Apollo';
import { LogInResponse } from '../graphql/Schema';

export const logOut = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  client.resetStore();
};

export const logIn = (response: LogInResponse): void => {
  localStorage.setItem('token', response.access_token);
  localStorage.setItem('user_id', String(response.user_id));
};

export const isLoggedIn = (): boolean => {
  return (
    !!localStorage.getItem('token') && !!Number(localStorage.getItem('user_id'))
  );
};

export const currentUserId = (): number => {
  return Number(localStorage.getItem('user_id'));
};
