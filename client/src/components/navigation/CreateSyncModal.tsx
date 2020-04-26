import React, { useState, ChangeEvent } from 'react';
import Select from 'react-select';
import styled, { withTheme } from 'styled-components';
import { Clock, Lock, Unlock, Users, X } from 'react-feather';
import DateTimePicker from 'react-datetime-picker';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
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
import { Sync, User } from '../../graphql/Schema';
import { currentUserId } from '../../utils/Auth';
import { GET_FEED } from '../../graphql/Queries';

const INSERT_SYNC = gql`
  mutation insertSync(
    $name: String!
    $public: Boolean!
    $deadline: timestamptz
    $cover_photo_url: String!
  ) {
    insert_sync(
      objects: {
        name: $name
        deadline: $deadline
        public: $public
        community_id: 1
        cover_photo_url: $cover_photo_url
      }
    ) {
      returning {
        id
        ...SyncInfo
        ...SyncUsers
      }
    }
  }
  ${SyncFragment.syncInfo}
  ${SyncFragment.syncUsers}
`;

const INSERT_SYNC_INVITED_USER = gql`
  mutation insertSyncInvitedUser($invited: [sync_invited_user_insert_input!]!) {
    insert_sync_invited_user(objects: $invited) {
      affected_rows
    }
  }
`;

const GET_USER = gql`
  query getUser($user_id: Int!) {
    user(where: { id: { _eq: $user_id } }) {
      id
      username
      friends {
        id
        username
      }
      communities {
        id
        name
      }
    }
  }
`;

const privacyOptions = ['Public', 'Private'];

const imageUrl = `/img/${Math.floor(Math.random() * 10 + 1)}.jpg`;

interface CreateSyncModalProps {
  theme: ThemeInterface;
  closeModal: () => void;
}

const CreateSyncModal: React.FC<CreateSyncModalProps> = ({
  theme,
  closeModal,
}) => {
  const userId = currentUserId();
  const [name, setName] = useState<string>('');
  const [publicSync, setPublicSync] = useState<number>(1);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [invitedUsers, setInvitedUsers] = useState<any[]>([]);

  const { loading, data: userData } = useQuery<{ user: User[] }>(GET_USER, {
    variables: { user_id: userId },
  });

  const [insertSyncInvitedUserMutation] = useMutation(
    INSERT_SYNC_INVITED_USER,
    {
      refetchQueries: [
        {
          query: GET_FEED,
          variables: { public: true },
        },
        {
          query: GET_FEED,
          variables: { public: false },
        },
      ],
      onError: (e) => console.log(e.message),
      onCompleted: (data) => {
        console.log(data);
      },
    },
  );

  const [insertSyncMutation] = useMutation<any>(INSERT_SYNC, {
    onError: (e) => console.log(e.message),
    onCompleted: (data) => {
      const invitations = invitedUsers.map((user: any) => {
        return { sync_id: data.insert_sync.returning[0].id, user_id: user.id };
      });

      insertSyncInvitedUserMutation({
        variables: {
          invited: [
            { sync_id: data.insert_sync.returning[0].id, user_id: userId },
            ...invitations,
          ],
        },
      });
    },
  });

  return (
    <SyncModalWrapper>
      <CoverPhoto url={imageUrl} />
      <TextInput
        placeholder="Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      />
      <InputWrapper>
        <InputIcon>
          <Users color={theme.light4} />
        </InputIcon>
        <StyledSelect
          isMulti
          onChange={(value: any[]) => setInvitedUsers(value)}
          options={
            loading
              ? []
              : userData?.user[0].friends.map((user) => {
                  return {
                    id: user.id,
                    value: user.username,
                    label: `@${user.username}`,
                  };
                })
          }
        />
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
          {privacyOptions[publicSync] === 'Public' ? (
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
                cover_photo_url: imageUrl,
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

const CoverPhoto = styled.div<{ url: string }>`
  ${BorderRadius}
  height: 120px;
  background: url(${({ url }) => url});
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

const StyledSelect = styled(Select)`
  display: flex;
  flex: 1;
  width: 100%;

  & > div {
    flex: 1;
  }
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
