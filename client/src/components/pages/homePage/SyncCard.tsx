import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Sync } from '../../../graphql/Schema';
import {
  BorderRadius,
  Heading2,
  Body,
  BoxShadow,
} from '../../../constants/Styles';
import Button from '../../common/Button';
import { getSyncPageRoute } from '../../../constants/Routes';

interface SyncCardProps {
  sync: Sync;
}

const SyncCard: React.FC<SyncCardProps> = ({ sync }) => {
  let timeString = '';
  if (sync.deadline) {
    const date = new Date(sync.deadline);
    const hourString = date.toLocaleTimeString(undefined, {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });
    timeString = `${date.toDateString()} ${hourString}`;
  }

  return (
    <SyncCardWrapper>
      <SyncCardBackground src={sync.cover_photo_url || '/img/bg.jpg'} />
      <Content>
        <Name>{sync.name}</Name>
        <Link to={getSyncPageRoute(sync.id)}>
          <Button>Join</Button>
        </Link>
      </Content>
      <Content>
        <GreyText>
          Invited: {sync.invited_users.map((u) => `@${u.username}`).join(', ')}
        </GreyText>
        <GreyText style={{ whiteSpace: 'nowrap', marginLeft: '24px' }}>
          {timeString && `Deadline: ${timeString}`}
        </GreyText>
      </Content>
    </SyncCardWrapper>
  );
};

export default SyncCard;

const SyncCardWrapper = styled.div`
  ${BorderRadius}
  ${BoxShadow}
  background: ${({ theme }) => theme.light1};
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 100%;
  margin-top: 32px;
`;

const SyncCardBackground = styled.div<{ src: string }>`
  height: 100px;
  width: 100%;
  ${BorderRadius}
  background: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  margin-bottom: 12px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

const Name = styled.div`
  ${Heading2}
  color: ${({ theme }) => theme.primaryGrey};
`;

const GreyText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark3};
`;
