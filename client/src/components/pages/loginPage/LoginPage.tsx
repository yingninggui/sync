import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Card, Link, Body } from '../../../constants/Styles';
import Button from '../../common/Button';

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <LoginPageWrapper>
      <LoginBox>
        <InputWrapper>
          Username
          <TextInput
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </InputWrapper>
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
        {!login && (
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
        {!login && (
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
        )}
        <ButtonWrapper>
          <LoginLink onClick={() => setLogin(!login)}>
            {login ? 'Sign Up' : 'Log In'}
          </LoginLink>
          <Button>Get Started</Button>
        </ButtonWrapper>
      </LoginBox>
    </LoginPageWrapper>
  );
};

export default LoginPage;

const LoginPageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) =>
    `linear-gradient(${theme.yellow}, ${theme.primary})`};
  display: flex;
  align-items: center;
`;

const LoginBox = styled.div`
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
  background: ${({ theme }) => theme.light1};
  margin-left: 16px;
  border: none;
  outline: none;
  padding: 4px 8px;
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
