export const logOut = (): void => {
  localStorage.removeItem('token');
};
