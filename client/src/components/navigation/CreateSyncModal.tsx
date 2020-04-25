import React, { useState, ChangeEvent } from 'react';
import styled, { withTheme } from 'styled-components';
import { Clock, Lock, Unlock, Users } from 'react-feather';
import DateTimePicker from 'react-datetime-picker';

import {
  BorderRadius,
  Input,
  BoxShadow,
  InterFont,
  DarkHover,
} from '../../constants/Styles';
import Button from '../common/Button';
import { ThemeInterface } from '../../styled';

interface CreateSyncModalProps {
  theme: ThemeInterface;
  closeModal: () => void;
}

const CreateSyncModal: React.FC<CreateSyncModalProps> = ({
  theme,
  closeModal,
}) => {
  const [title, setTitle] = useState<string>('');
  const [publicSync, setPublicSync] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<Date>(new Date());

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
          <Users color={theme.light4} />
        </InputIcon>
        Invite friends
        <TextInput placeholder="Invite friends" />
      </InputWrapper>
      <InputWrapper>
        <InputWrapper>
          <InputIcon>
            <Clock color={theme.light4} />
          </InputIcon>
          <StyledDateTimePicker
            onChange={(date: Date) => setDeadline(date)}
            value={deadline}
            disableClock
            calendarIcon={null}
            clearIcon={null}
            maxDetail="minute"
          />
        </InputWrapper>
        <InputWrapper>
          <InputIcon>
            {publicSync ? (
              <Unlock color={theme.light4} />
            ) : (
              <Lock color={theme.light4} />
            )}
          </InputIcon>
          <TextInput placeholder="Private" />
        </InputWrapper>
      </InputWrapper>
      <ButtonWrapper>
        <Button margin="0 8px 0 0" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            closeModal();
          }}
        >
          Save
        </Button>
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
  align-items: center;
  justify-content: space-between;
`;

const InputIcon = styled.div`
  margin-right: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-content: flex-end;
  margin-left: auto;
  margin-top: 16px;
`;

const StyledDateTimePicker = styled(DateTimePicker)`
  .react-datetime-picker__wrapper {
    ${Input}
    padding: 8px 16px;
    margin-top: 8px;
  }

  .react-datetime-picker__inputGroup__input {
    ${BorderRadius}
  }

  .react-calendar {
    ${InterFont}
    ${BorderRadius}
    ${BoxShadow}
    border: none;

    .react-calendar__tile {
      ${BorderRadius}
      color: ${({ theme }) => theme.primaryGrey} !important;
    }

    .react-calendar__tile--active {
      background: ${({ theme }) => theme.primaryLight} !important;
      color: ${({ theme }) => theme.primaryGrey} !important;
      font-weight: 700;
      ${DarkHover()}
      
      &:focus, &:active {
        outline: none;
      }
    }

    .react-calendar__month-view__days__day--weekend {
      color: ${({ theme }) => theme.primaryGrey};
    }

    .react-calendar__tile--now {
      background: ${({ theme }) => theme.yellow};
      ${DarkHover()}
    }
  }
`;
