import React, { useState, ChangeEvent } from 'react';
import styled, { withTheme } from 'styled-components';
import { Clock, Lock, Unlock, Users } from 'react-feather';

import { BorderRadius, Input } from '../../constants/Styles';
import Button from '../common/Button';

const CreateSyncModal: React.FC<any> = ({ theme }) => {
  const [publicSync, setPublicSync] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  return (
    <SyncModalWrapper>
      <CoverPhoto />
      <TextInput
        placeholder="Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <InputWrapper>
        <InputIcon>
          <Clock color={theme.light1} />
        </InputIcon>
        <TextInput placeholder="Date" />
      </InputWrapper>
      <InputWrapper>
        <InputIcon>
          <Users color={theme.light1} />
        </InputIcon>
        <TextInput placeholder="Invite friends" />
      </InputWrapper>
      <InputWrapper>
        <InputIcon>
          {publicSync ? (
            <Unlock color={theme.light1} />
          ) : (
            <Lock color={theme.light1} />
          )}
        </InputIcon>
        <TextInput placeholder="Private" />
      </InputWrapper>
      <ButtonWrapper>
        <Button margin="0 8px 0 0">Cancel</Button>
        <Button>Save</Button>
      </ButtonWrapper>
    </SyncModalWrapper>
  );
};

export default withTheme(CreateSyncModal);

const SyncModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.white};
  ${BorderRadius}
  padding: 24px;
`;

const CoverPhoto = styled.div`
  ${BorderRadius}
  height: 120px;
  background: url('/img/bg.jpg');
  background-size: cover;
  background-position: center;
  margin-bottom: 8px;
`;

const TextInput = styled.input`
  ${Input}
  width: 100%;
  padding: 8px 16px;
  margin-top: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const InputIcon = styled.div`
  margin-right: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-content: flex-end;
  margin-left: auto;
  margin-top: 16px;
`;
