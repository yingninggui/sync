import React, { useState, ChangeEvent } from 'react';
import styled, { withTheme } from 'styled-components';
import { Clock, Lock, Unlock, Users, X } from 'react-feather';
import DateTimePicker from 'react-datetime-picker';
import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';
import {
  BorderRadius,
  Input,
  BoxShadow,
  InterFont,
  DarkHover,
} from '../../constants/Styles';
import Button from '../common/Button';
import { ThemeInterface } from '../../styled';
import Dropdown from '../common/Dropdown';
import { SyncFragment } from '../../graphql/Fragments';
import { Sync } from '../../graphql/Schema';

const INSERT_SYNC = gql`
  mutation insertSync(
    $name: String!
    $public: Boolean!
    $deadline: timestamptz
  ) {
    insert_sync(
      objects: {
        name: $name
        deadline: $deadline
        public: $public
        community_id: 1
      }
    ) {
      returning {
        ...SyncInfo
        ...SyncUsers
      }
    }
  }
  ${SyncFragment.syncInfo}
  ${SyncFragment.syncUsers}
`;

const privacyOptions = ['Public', 'Private'];

interface CreateSyncModalProps {
  theme: ThemeInterface;
  closeModal: () => void;
}

const CreateSyncModal: React.FC<CreateSyncModalProps> = ({
  theme,
  closeModal,
}) => {
  const [name, setName] = useState<string>('');
  const [publicSync, setPublicSync] = useState<number>(1);
  const [deadline, setDeadline] = useState<Date | null>(null);

  const [insertSyncMutation] = useMutation<{ returning: Sync }>(INSERT_SYNC, {
    onError: (e) => console.log(e.message),
    onCompleted: (data) => {
      console.log(data);
    },
  });

  return (
    <SyncModalWrapper>
      <CoverPhoto />
      <TextInput
        placeholder="Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <InputWrapper>
        <InputIcon>
          <Users color={theme.light4} />
        </InputIcon>
        <TextInput placeholder="Invite friends @" />
      </InputWrapper>
      <InputWrapper>
        <InputIcon>
          <Clock color={theme.light4} />
        </InputIcon>
        <StyledDateTimePicker
          onChange={(date: Date) => setDeadline(date)}
          value={deadline}
          disableClock
          calendarIcon={null}
          clearIcon={<X size={14} />}
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
        <Dropdown
          items={privacyOptions}
          selectedIndex={publicSync}
          setSelectedIndex={setPublicSync}
        />
      </InputWrapper>

      <ButtonWrapper>
        <Button margin="0 8px 0 0" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            insertSyncMutation({
              variables: {
                name,
                deadline: deadline?.toISOString(),
                public: privacyOptions[publicSync] === 'Public',
              },
            });
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
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const InputIcon = styled.div`
  margin-right: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-content: flex-end;
  margin-left: auto;
`;

const StyledDateTimePicker = styled(DateTimePicker)`
  .react-datetime-picker__wrapper {
    ${Input}
    padding: 8px 16px;
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
