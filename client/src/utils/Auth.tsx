import client from '../graphql/Apollo';
import { LogInResponse } from '../graphql/Schema';

export const logOut = (): void => {
  localStorage.clear();
  client.resetStore();
};

export const logIn = (response: LogInResponse): void => {
  localStorage.setItem('token', response.access_token);
  localStorage.setItem('user_id', String(response.user_id));
  localStorage.setItem('username', String(response.username));
  localStorage.setItem('swrtc_token', String(response.swrtc_token));
};

export const isLoggedIn = (): boolean => {
  return (
    !!localStorage.getItem('token') && !!Number(localStorage.getItem('user_id'))
  );
};

export const currentUserId = (): number => {
  return Number(localStorage.getItem('user_id'));
};

export const currentUsername = (): string => {
  return localStorage.getItem('username') || '';
};

export const currentSWRTCToken = (): string => {
  return localStorage.getItem('swrtc_token') || '';
};
