import React, { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Card, Link, Body, Input } from '../../../constants/Styles';
import Button from '../../common/Button';
import { LogIn } from '../../../graphql/Schema';
import { logIn, isLoggedIn } from '../../../utils/Auth';
import { HOME_PAGE_ROUTE } from '../../../constants/Routes';

const SIGN_UP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    register_user(
      credentials: { username: $username, email: $email, password: $password }
    ) {
      access_token
    }
  }
`;

const LOG_IN = gql`
  mutation logIn($email: String!, $password: String!) {
    login_user(credentials: { email: $email, password: $password }) {
      access_token
    }
  }
`;

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn()) {
      history.push(HOME_PAGE_ROUTE);
    }
  }, [history]);

  const [signUpMutation] = useMutation<{ register_user: LogIn }>(SIGN_UP, {
    onError: (e) => setError(e.message),
    onCompleted: (data) => {
      logIn(data.register_user.access_token);
      history.push(HOME_PAGE_ROUTE);
    },
  });

  const [logInMutation] = useMutation<{ login_user: LogIn }>(LOG_IN, {
    onError: (e) => setError(e.message),
    onCompleted: (data) => {
      logIn(data.login_user.access_token);
      history.push(HOME_PAGE_ROUTE);
    },
  });

  const loginVariables = {
    email,
    password,
    ...(!isLogin && { username }),
  };

  const performLogin = () =>
    isLogin
      ? logInMutation({ variables: loginVariables })
      : signUpMutation({ variables: loginVariables });

  return (
    <LoginPageWrapper>
      <LoginForm
        onSubmit={(e: any) => {
          e.preventDefault();
          performLogin();
        }}
      >
        {error && <ErrorText>{error}</ErrorText>}
        <InputWrapper>
          School Email
          <TextInput
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </InputWrapper>
        {!isLogin && (
          <InputWrapper>
            Username
            <TextInput
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </InputWrapper>
        )}
        <InputWrapper>
          Password
          <TextInput
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </InputWrapper>
        {!isLogin && (
          <InputWrapper>
            Confirm Password
            <TextInput
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </InputWrapper>
        )}
        <ButtonWrapper>
          <LoginLink onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </LoginLink>
          <Button onClick={performLogin} type="submit">
            Get Started
          </Button>
        </ButtonWrapper>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default withRouter(LoginPage);

const LoginPageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) =>
    `linear-gradient(${theme.yellow}, ${theme.primary})`};
  display: flex;
  align-items: center;
`;

const LoginForm = styled.form`
  ${Card}
  margin: auto;
  background: ${({ theme }) => theme.white};
  padding: 24px;
  width: 400px;
  text-align: right;
`;

const InputWrapper = styled.div`
  display: flex;
  margin: 8px auto;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  width: 100%;
`;

const TextInput = styled.input`
  ${Input}
  margin-left: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: center;
  justify-content: space-between;
`;

const LoginLink = styled.div`
  ${Link}
  ${Body}
  text-decoration: underline;
`;

const ErrorText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.darkRed};
`;
