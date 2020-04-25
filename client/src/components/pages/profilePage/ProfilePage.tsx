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
        <Avatar bgColor={theme.red} width={100} height={100} />
        <UsernameWrapper>
          <TitleText>Username</TitleText>
          <UsernameBodyText> @therealyg </UsernameBodyText>
        </UsernameWrapper>
      </UserWrapper>
      <TitleText>Friends</TitleText>
      <ListWrapper>
        <ListItemWrapper>
          <Avatar
            bgColor={theme.yellow}
            width={100}
            height={100}
            letterSize={25}
            firstLetter={'Y'}
          />

          <BodyText>@therealyg</BodyText>
        </ListItemWrapper>
        <ListItemWrapper>
          <Avatar bgColor={theme.yellow} width={100} height={100} />
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
