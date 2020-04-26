import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { User } from '../../../graphql/Schema';

import { BorderRadius, Input, Body } from '../../../constants/Styles';
import Button from '../../common/Button';
import { currentUserId } from '../../../utils/Auth';
import Avatar from '../../common/Avatar';
import { GET_USER } from '../../../graphql/Queries';

const INSERT_NEW_FRIEND = gql`
  mutation add_friend($from_id: Int!, $to_id: Int!) {
    insert_user_friend_one(object: { from_id: $from_id, to_id: $to_id }) {
      from_id
      to_id
    }
  }
`;

const SEARCH_USERS = (name: string) => gql`
  query searchUsers {
    user(where: { username: { _ilike: "${name}%" } }) {
      id
      username
    }
  }
`;

interface AddFriendModalProps {
  closeModal: () => void;
  friends: User[];
}

const AddFriendModal: React.FC<AddFriendModalProps> = ({
  closeModal,
  friends,
}) => {
  const userId = currentUserId();
  const [name, setName] = useState<string>('');
  const [notInFriendsList, setNotInFriendsList] = useState<User[]>([]);

  const [addFriend] = useMutation<{ returning: User }>(INSERT_NEW_FRIEND, {
    refetchQueries: [
      {
        query: GET_USER,
        variables: { user_id: userId },
      },
    ],
    onError: (e) => console.log(e.message),
    onCompleted: () => console.log('Hooray'),
  });

  const [findFriend] = useLazyQuery<{ user: User[] }>(SEARCH_USERS(name), {
    onError: (e) => console.log(e.message),
    onCompleted: (data) => {
      const notFriendsSet = new Set(data.user.map((u) => u.username));
      friends.forEach((u: User) => {
        notFriendsSet.delete(u.username);
      });
      const shownFriends: User[] = data.user.filter(
        (u) => notFriendsSet.has(u.username) && u.id !== userId,
      );
      setNotInFriendsList(shownFriends);
    },
  });

  return (
    <AddFriendModalWrapper>
      <SearchInput
        placeholder="Search for a new friend"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
          findFriend();
        }}
      />
      {notInFriendsList.map((user) => (
        <FriendWrapper key={user.id}>
          <Row>
            <Avatar dimension={40} letterSize={24} name={user.username} />
            <Text>@{user.username}</Text>
          </Row>
          <Button
            onClick={() => {
              addFriend({
                variables: {
                  from_id: userId,
                  to_id: user.id,
                },
              });
              setNotInFriendsList(
                notInFriendsList.filter((u) => u.id !== user.id),
              );
            }}
          >
            Add
          </Button>
        </FriendWrapper>
      ))}
      {notInFriendsList.length === 0 && name !== '' && (
        <Text style={{ margin: '16px auto' }}>No users found</Text>
      )}
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

const Text = styled.div`
  ${Body};
  font-weight: 700;
  margin-left: 24px;
`;

const FriendWrapper = styled.div`
  ${BorderRadius}
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.light1};
  padding: 16px;
  margin: 16px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
