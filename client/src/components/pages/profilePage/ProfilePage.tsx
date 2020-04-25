import React from 'react';
import styled, { withTheme } from 'styled-components';
import Avatar from '../../common/Avatar';
import CircleButton from '../../common/CircleButton';
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
          />
          <BodyText>+friends</BodyText>
        </ListItemWrapper>
        <ListItemWrapper>
          <Avatar dimension={80} letterSize={25} name={'therealyg'} />
          <BodyText>@therealyg</BodyText>
        </ListItemWrapper>
        <ListItemWrapper>
          <Avatar dimension={80} letterSize={25} name={'yayimahuman'} />
          <BodyText>@yayhuman</BodyText>
        </ListItemWrapper>
        <ListItemWrapper>
          <Avatar dimension={80} letterSize={25} name={'ez'} />
          <BodyText>@ez</BodyText>
        </ListItemWrapper>
      </ListWrapper>
      <TitleText>Communities</TitleText>
      <ListWrapper>
        <ListItemWrapper>
          <CircleButton
            textColor={theme.white}
            bgColor={theme.primaryGrey}
            dimension={80}
          />
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
