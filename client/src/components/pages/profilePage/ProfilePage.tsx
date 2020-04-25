import React from 'react';
import styled, { withTheme } from 'styled-components';
import Avatar from '../../common/Avatar';
import {
  PageContent,
  Heading1,
  Heading3,
  Body,
} from '../../../constants/Styles';

const ProfilePage: React.FC<any> = ({ theme }) => {
  return (
    <ProfilePageWrapper>
      <UserWrapper>
        <Avatar dimension={100} letterSize={25} name={'Y'} />
        <UsernameWrapper>
          <TitleText>Username</TitleText>
          <UsernameBodyText> @therealyg </UsernameBodyText>
        </UsernameWrapper>
      </UserWrapper>
      <TitleText>Friends</TitleText>
      <ListWrapper>
        <ListItemWrapper>
          <Avatar dimension={100} letterSize={25} name={'Y'} />
          <BodyText>@therealyg</BodyText>
        </ListItemWrapper>
      </ListWrapper>
      <TitleText>Communities</TitleText>
      <ListWrapper></ListWrapper>
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
  padding: 24px 0;
  align-items: center;
  display: flex-direction-column;
  justify-content: center;
`;

const ListWrapper = styled.div`
  ${PageContent}
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
`;
