import React, { useState, ChangeEvent } from 'react';
import styled, { withTheme } from 'styled-components';
import { Clock, Lock, Unlock, Users, X } from 'react-feather';
import DateTimePicker from 'react-datetime-picker';
import gql from 'graphql-tag';
import Unsplash, { toJson } from 'unsplash-js';

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

const unsplash = new Unsplash({
  accessKey: 'YTgX2V-LpXqs0d1IAqpT1xzC_z26uZd_rVRgrElPf40',
});

function getPhoto(title: string): string {
  unsplash.photos
    .getRandomPhoto({ query: title })
    .then(toJson)
    .then((json) => {
      console.log(json.links.html);
      return json;
    });
  return 'https://images.unsplash.com/photo-1517848568502-d03fa74e1964?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';
}

function getPhotoHelper(url: string) {
  fetch(url).then((response) => {
    console.log('hi');
    console.log(response.url);
    return response.url;
  });
}
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
      <View>
        <CoverPhoto />
      </View>
      <TextInput
        placeholder="Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      />
      <View>
        <CoverPhoto
          image={
            'https://images.unsplash.com/photo-1517848568502-d03fa74e1964?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
          }
        />
      </View>
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
  position: relative;
`;

const CoverPhoto = styled.div<{
  image?: string;
}>`
  ${BorderRadius}
  height: 120px;
  background: url('${({ image }) => image || '/img/bg.jpg'}');
  background-size: cover;
  background-position: center;
  margin-bottom: 8px;
  position: absolute;
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

const View = styled.div`
  position: relative;
`;
