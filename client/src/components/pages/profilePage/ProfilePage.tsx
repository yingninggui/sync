import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Modal } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { Plus } from 'react-feather';
import gql from 'graphql-tag';
import Avatar from '../../common/Avatar';
import CircleButton from '../../common/CircleButton';
import { User } from '../../../graphql/Schema';
import {
  PageContent,
  Heading1,
  Heading3,
  Body,
  BorderRadius,
} from '../../../constants/Styles';

const GET_FRIENDS = gql`
  query getFriends($user_id: Int!) {
    user_by_pk(id: $user_id) {
      friends {
        username
      }
    }
  }
`;

const ProfilePage: React.FC<any> = ({ theme }) => {
  const [addFriendModal, setAddFriendModal] = useState<boolean>(false);
  const [addCommunityModal, setAddCommunityModal] = useState<boolean>(false);
  const { data } = useQuery<{ user_friends: { friends: User[] } }>(GET_FRIENDS);
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
        <ListItemWrapper>
          <Avatar dimension={80} letterSize={25} name={'se2022'} />
          <BodyText>@software</BodyText>
        </ListItemWrapper>
        <ListItemWrapper>
          <Avatar dimension={80} letterSize={25} name={'math239'} />
          <BodyText>@math239</BodyText>
        </ListItemWrapper>
        <ListItemWrapper>
          <Avatar dimension={80} letterSize={25} name={'waterloo'} />
          <BodyText>@waterloo</BodyText>
        </ListItemWrapper>
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
