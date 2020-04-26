import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Modal } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { Plus } from 'react-feather';
import gql from 'graphql-tag';
import _ from 'lodash';
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

const ProfilePage: React.FC<any> = ({ theme }) => {
  const [addFriendModal, setAddFriendModal] = useState<boolean>(false);
  const [addCommunityModal, setAddCommunityModal] = useState<boolean>(false);
  const { loading, error, data } = useQuery<{ user: User[] }>(GET_FRIENDS, {
    variables: { user_id: 4 },
  });
  console.log(loading, error, data);
  if (data && data.user[0].friends.length < 1) {
    throw new Error('Failed to find friends');
  }
  const friends: Array<User> = _.get(data, 'user[0].friends', []);
  const communities: Array<Community> = _.get(data, 'user[0].communities', []);

  return (
    <ProfilePageWrapper>
      <UserWrapper>
        <Avatar dimension={80} letterSize={25} name={'therealyg'} />
        <UsernameWrapper>
          <TitleText>Username</TitleText>
          <UsernameBodyText>@therealyg</UsernameBodyText>
        </UsernameWrapper>
      </UserWrapper>
      <TitleText>Friends</TitleText>
      <ListWrapper>
        <ListItemWrapper>
          <CircleButton
            textColor={theme.white}
            bgColor={theme.primaryGrey}
            dimension={80}
            onClick={() => setAddFriendModal(true)}
          >
            <Icons>
              <Plus size={20} />
            </Icons>
          </CircleButton>
          <BodyText>+friends</BodyText>
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
        <ListItemWrapper>
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
          <BodyText>+community</BodyText>
        </ListItemWrapper>
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
        <ModalStyle>
          <SearchInput placeholder="Find friends..." />
        </ModalStyle>
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
