import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Row, Col } from 'reactstrap';
import { PhoneMissed } from 'react-feather';
import url from 'url';

import Avatar from '../../common/Avatar';
import { BorderRadius, DarkHover } from '../../../constants/Styles';

const HangUpButton: React.FC<any> = () => {
  return (
    <HangUpButtonWrapper>
      <PhoneMissed size={50} />
    </HangUpButtonWrapper>
  );
};

const SyncPage: React.FC<any> = ({ theme }) => {
  // const [publicFeed, setPublicFeed] = useState<boolean>(true);
  const users: Array<any> = [
    { bgColor: theme.red, height: 100, width: 100 },
    { bgColor: theme.red, height: 100, width: 100 },
  ];

  return (
    <SyncPageWrapper>
      <div></div>
      <Row>{users.map(Avatar)}</Row>
      <Row>
        <Col style={{ padding: '0px 50px' }}>
          <SyncPageCard>
            <h3>Checkpoints</h3>
          </SyncPageCard>
        </Col>
        <Col style={{ padding: '0px 50px' }}>
          <SyncPageCard>
            <h3>People who have finished:</h3>

            <h3>People who are still working:</h3>
          </SyncPageCard>
        </Col>
      </Row>
      <HangUpButton />
      <div></div>
    </SyncPageWrapper>
  );
};

const SyncPageWrapper = styled.div`
  background: url(${url.resolve(process.env.PUBLIC_URL || '', '/img/bg.jpg')})
    ${({ theme }) => theme.primary} no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: calc(100% - 90px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ;
`;

const HangUpButtonWrapper = styled.div`
  ${DarkHover()}
  height: 100px;
  width: 100px;
  background-color: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.white};
  border-radius: 50%;
  padding: 28px 0px 0px 23px;
`;

const SyncPageCard = styled.div`
    ${BorderRadius}
    background-color: ${({ theme }) => `${theme.white}80`};
    min-width: 300px;
    height: 100%;
    width: 30vw;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default withTheme(SyncPage);
