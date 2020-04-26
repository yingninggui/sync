import React, { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';

import {
  Card,
  Link,
  Heading1,
  Heading2,
  Body,
  Input,
} from '../../../constants/Styles';
import Button from '../../common/Button';
import { LogInResponse } from '../../../graphql/Schema';
import { logIn, isLoggedIn } from '../../../utils/Auth';
import { HOME_PAGE_ROUTE } from '../../../constants/Routes';

const SIGN_UP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    register_user(
      credentials: { username: $username, email: $email, password: $password }
    ) {
      access_token
      user_id
      username
      swrtc_token
    }
  }
`;

const LOG_IN = gql`
  mutation logIn($email: String!, $password: String!) {
    login_user(credentials: { email: $email, password: $password }) {
      access_token
      user_id
      username
      swrtc_token
    }
  }
`;

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

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

  const [signUpMutation] = useMutation<{ register_user: LogInResponse }>(
    SIGN_UP,
    {
      onError: (e) => setError(e.message),
      onCompleted: (data) => {
        logIn(data.register_user);
        history.push(HOME_PAGE_ROUTE);
      },
    },
  );

  const [logInMutation] = useMutation<{ login_user: LogInResponse }>(LOG_IN, {
    onError: (e) => setError(e.message),
    onCompleted: (data) => {
      logIn(data.login_user);
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
      <TitleWrapper>
        <Title>Let&apos;s Sync </Title>
        <SubTitle>
          Just as if we were working beside each other in the library.{' '}
          <span role="img" aria-label="book">
            📚
          </span>
        </SubTitle>
      </TitleWrapper>
      <LoginForm
        onSubmit={(e: any) => {
          e.preventDefault();
          performLogin();
        }}
      >
        <Row style={{ justifyContent: 'center' }}>
          <Button
            bgColor={'#3EADCF'}
            textColor={'#ffffff'}
            onClick={() =>
              logInMutation({
                variables: {
                  email: 'therealyg@uwaterloo.ca',
                  password: 'password',
                },
              })
            }
          >
            For a demo user, click here
          </Button>
        </Row>
        <hr />
        {error && <ErrorText>{error}</ErrorText>}
        <InputWrapper>
          Student Email
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
            Confirm
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
          <Button
            bgColor={'#3EADCF'}
            textColor={'#ffffff'}
            onClick={performLogin}
            type="submit"
          >
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
  background: ${({ theme }) => `linear-gradient(${'#3EADCF'}, ${'#ABE9CD'})`};
  display: flex;
  align-items: center;
  padding: 32px 64px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobileLarge}px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const LoginForm = styled.form`
  ${Card}
  margin: auto;
  background: ${({ theme }) => theme.white};
  padding: 24px;
  width: 360px;
  text-align: right;

  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobileLarge}px) {
    margin-top: 24px;
    margin-bottom: 48px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  margin: 8px auto;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
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

const Title = styled.div`
  ${Heading1}
  font-size: 40px;
  color: #ffffff;
`;

const SubTitle = styled.div`
  ${Heading2}
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
`;

const TitleWrapper = styled.div`
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  max-width: 40%;

  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobileLarge}px) {
    max-width: 100%;
  }
`;
