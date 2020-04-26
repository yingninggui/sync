import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Modal } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { Plus } from 'react-feather';
import gql from 'graphql-tag';

import Avatar from '../../common/Avatar';
import CircleButton from '../../common/CircleButton';
import { Community, User } from '../../../graphql/Schema';
import {
  PageContent,
  Heading1,
  Heading3,
  Body,
  BorderRadius,
} from '../../../constants/Styles';
import AddFriendModal from './AddFriendModal';
import { currentUserId } from '../../../utils/Auth';
import Spinner from '../../common/Spinner';

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

const ProfilePage: React.FC<any> = ({ theme }) => {
  const [addFriendModal, setAddFriendModal] = useState<boolean>(false);
  const [addCommunityModal, setAddCommunityModal] = useState<boolean>(false);

  const { loading, error, data } = useQuery<{ user: User[] }>(GET_USER, {
    variables: { user_id: currentUserId() },
  });

  if (loading) {
    return <Spinner />;
  }

  const friends: User[] = data?.user[0].friends || [];
  const communities: Community[] = data?.user[0].communities || [];

  return (
    <ProfilePageWrapper>
      <UserWrapper>
        <Avatar
          dimension={80}
          letterSize={25}
          name={data?.user[0].username || ''}
        />
        <UsernameWrapper>
          <TitleText>Username</TitleText>
          <UsernameBodyText>@{data?.user[0].username}</UsernameBodyText>
        </UsernameWrapper>
      </UserWrapper>
      <TitleText>Friends</TitleText>
      <ListWrapper>
        <ListItemWrapper>
          <CircleButton
            textColor={theme.dark3}
            bgColor={theme.light1}
            dimension={80}
            onClick={() => setAddFriendModal(true)}
          >
            <Icons>
              <Plus size={20} />
            </Icons>
          </CircleButton>
          <BodyText style={{ marginTop: '2px', fontWeight: 700 }}>
            add friends
          </BodyText>
        </ListItemWrapper>
        {friends.slice(0, 6).map((friend, idx) => (
          <ListItemWrapper key={idx}>
            <Avatar dimension={80} letterSize={25} name={friend.username} />
            <BodyText>{friend.username}</BodyText>
          </ListItemWrapper>
        ))}
      </ListWrapper>
      <TitleText>Communities</TitleText>
      <ListWrapper>
        {/* <ListItemWrapper>
          <CircleButton
            textColor={theme.white}
            bgColor={theme.primaryGrey}
            dimension={80}
            onClick={() => setAddCommunityModal(true)}
          >
            <Icons>
              <Plus size={20} />
            </Icons>
          </CircleButton>
          <BodyText>Add Communities</BodyText>
        </ListItemWrapper> */}
        {communities.slice(0, 6).map((community, idx) => (
          <ListItemWrapper key={idx}>
            <Avatar dimension={80} letterSize={25} name={community.name} />
            <BodyText>{community.name}</BodyText>
          </ListItemWrapper>
        ))}
      </ListWrapper>
      <Modal
        centered
        isOpen={addFriendModal}
        toggle={() => setAddFriendModal(!addFriendModal)}
      >
        <AddFriendModal
          closeModal={() => setAddFriendModal(false)}
          friends={friends}
        />
      </Modal>
      <Modal
        centered
        isOpen={addCommunityModal}
        toggle={() => setAddCommunityModal(!addCommunityModal)}
      >
        <ModalStyle>
          <SearchInput placeholder="Find communities..." />
        </ModalStyle>
      </Modal>
    </ProfilePageWrapper>
  );
};

export default withTheme(ProfilePage);

const ProfilePageWrapper = styled.div`
  ${PageContent}
`;

const UserWrapper = styled.div`
  ${PageContent}
  padding: 24px 0;
  display: flex;
`;

const UsernameWrapper = styled.div`
  ${PageContent}
  margin-left: 24px;
`;

const TitleText = styled.div`
  ${Heading1}
`;

const UsernameBodyText = styled.div`
  ${Heading3}
`;

const BodyText = styled.div`
  ${Body}
`;

const ListItemWrapper = styled.div`
  display: flex-direction-column;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  max-width: 75px;
`;

const ListWrapper = styled.div`
  ${PageContent}
  padding: 24px 0;
  display: flex;
  justify-content: left;
`;

const SearchInput = styled.input`
  ${BorderRadius}
  ${Body}
  padding: 8px 24px;
  border: none;
  outline: none;
  width: 100%;
  max-width: 400px;
  margin: 0 24px;
  background: ${({ theme }) => theme.light1};
  color: ${({ theme }) => theme.primaryGrey};
`;

const ModalStyle = styled.div`
  padding: 24px;
`;

const Icons = styled.div`
  display: flex;
`;
