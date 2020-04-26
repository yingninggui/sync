import React, { useState, ChangeEvent } from 'react';
import styled, { withTheme } from 'styled-components';
import gql from 'graphql-tag';
import _ from 'lodash';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { User } from '../../../graphql/Schema';

import { ThemeInterface } from '../../../styled';

import { BorderRadius, Input } from '../../../constants/Styles';
import Button from '../../common/Button';

const INSERT_NEW_FRIEND = gql`
  mutation add_friend($from_id: Int!, $to_id: Int!) {
    insert_user_friend_one(object: { from_id: $from_id, to_id: $to_id }) {
      from_id
      to_id
    }
  }
`;

const GET_FRIENDS = gql`
  query getFriends($user_id: Int!) {
    user(where: { id: { _eq: $user_id } }) {
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

const FIND_USER = gql`
  query getUser($user_id: Int!) {
    user(where: { username: { _ilike: "e%" } }) {
      id
      username
    }
  }
`;

interface AddFriendModalProps {
  closeModal: () => void;
}

const AddFriendModal: React.FC<AddFriendModalProps> = ({ closeModal }) => {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<number>();
  const [notInFriendsList, setNotInFriendsList] = useState<boolean>();

  const [addFriend] = useMutation<{ returning: User }>(INSERT_NEW_FRIEND, {
    onError: (e) => console.log(e.message),
    onCompleted: () => console.log('Hooray'),
  });

  const { loading, error, data } = useQuery<{ user: User[] }>(GET_FRIENDS, {
    variables: { user_id: 4 },
  });
  console.log(loading, error, data);
  if (data && data.user[0].friends.length < 1) {
    throw new Error('Failed to find friends');
  }
  const friends: Array<User> = _.get(data, 'user[0].friends', []);

  const [findFriend] = useLazyQuery<{ allUsers: Array<User> }>(FIND_USER, {
    onError: (e) => console.log(e.message),
    onCompleted: (data2) => {
      console.log(data2);
      const notFriendsSet = new Set(friends);
      console.log(notFriendsSet);
      console.log(data2.allUsers);
      data2.allUsers.forEach((u) => {
        console.log('u:');
        console.log(u);
        notFriendsSet.delete(u);
      });
    },
  });
  return (
    <AddFriendModalWrapper>
      <SearchInput
        placeholder="Search for new friend"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
          findFriend({
            variables: {
              username: name,
            },
          });
        }}
      />
      // render the ones not in the friends list // every friend will have its
      own add button
      <ButtonWrapper>
        <Button
          onClick={() => {
            addFriend({
              variables: {
                from_id: 4,
                to_id: id,
              },
            });
            closeModal();
          }}
        >
          Add
        </Button>
      </ButtonWrapper>
    </AddFriendModalWrapper>
  );
};

export default AddFriendModal;

const AddFriendModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.white};
  ${BorderRadius}
  padding: 24px;
`;

const SearchInput = styled.input`
  ${Input}
  width: 100%;
  padding: 8px 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-content: flex-end;
  margin-left: auto;
`;
