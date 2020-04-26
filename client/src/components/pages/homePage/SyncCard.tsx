import React from 'react';
import styled from 'styled-components';

import { Sync } from '../../../graphql/Schema';
import { BorderRadius, Heading2 } from '../../../constants/Styles';
import Button from '../../common/Button';

interface SyncCardProps {
  sync: Sync;
}

const SyncCard: React.FC<SyncCardProps> = ({ sync }) => (
  <SyncCardWrapper>
    <SyncCardBackground src={sync.cover_photo_url || '/img/bg.jpg'} />
    <Content>
      <Name>{sync.name}</Name>
      <Button>Join</Button>
    </Content>
  </SyncCardWrapper>
);

export default SyncCard;

const SyncCardWrapper = styled.div`
  ${BorderRadius}
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
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const Name = styled.div`
  ${Heading2}
  color: ${({ theme }) => theme.primaryGrey};
`;
