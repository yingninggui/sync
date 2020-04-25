import React, { useState } from 'react';
import { PhoneMissed, MicOff } from 'react-feather';
import { Row, Col } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import styled, { withTheme } from 'styled-components';
import url from 'url';
import gql from 'graphql-tag';

import Avatar from '../../common/Avatar';
import RoundButton from '../../common/RoundButton';
import Checkbox from '../../common/Checkbox';
import { BorderRadius } from '../../../constants/Styles';

import { User, Checkpoint, Sync } from '../../../graphql/Schema';
import { SyncFragment } from '../../../graphql/Fragments';

const GET_SYNC_DETAILS = gql`
  query getSyncDetails($id: Int!) {
    sync_by_pk(id: $id) {
      ...SyncInfo
      ...SyncUsers
      ...SyncCheckpoints
    }
  }
  ${SyncFragment.syncInfo}
  ${SyncFragment.syncUsers}
  ${SyncFragment.syncCheckpoints}
`;

const SyncPage: React.FC<any> = ({ theme, match }) => {
  const users: Array<User> = [];
  const checkpoints: Array<Checkpoint> = [];
  const syncID = parseInt(match.params.syncID, 10);
  const { loading, error, data } = useQuery<{ sync: Sync }>(GET_SYNC_DETAILS, {
    variables: { id: syncID },
  });

  console.log(loading, error, data);

  const [cSelected, setCSelected] = useState<Array<any>>([]);
  const onCheckboxBtnClick = (selected: any) => {
    const index: number = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };

  return (
    <SyncPageWrapper>
      <div></div>
      <Row>{users.map((user) => ({ name: user.username })).map(Avatar)}</Row>
      <Row>
        <Col style={{ padding: '0px 50px' }}>
          <SyncPageCard>
            <h3>Checkpoints</h3>
            {checkpoints.map(({ id: checkpointId, name }) => (
              <Checkbox
                key={checkpointId}
                onClick={() => onCheckboxBtnClick(checkpointId)}
                active={cSelected.includes(checkpointId)}
                text={name}
              />
            ))}
          </SyncPageCard>
        </Col>
        <Col style={{ padding: '0px 50px' }}>
          <SyncPageCard>
            <h3>People who have finished:</h3>

            <h3>People who are still working:</h3>
          </SyncPageCard>
        </Col>
      </Row>
      <Row>
        <RoundButton
          textColor={theme.white}
          bgColor={theme.primary}
          dimension={100}
          margin="0px 20px"
        >
          <MicOff size={50} />
        </RoundButton>
        <RoundButton
          textColor={theme.white}
          bgColor={theme.error}
          dimension={100}
          margin="0px 20px"
        >
          <PhoneMissed size={50} />
        </RoundButton>
      </Row>
      <div></div>
    </SyncPageWrapper>
  );
};

const SyncPageWrapper = styled.div`
  background: url(${url.resolve(process.env.PUBLIC_URL || '', '/img/bg.jpg')})
    ${({ theme }) => theme.primary} no-repeat center center fixed;
  background-size: cover;
  height: calc(100% - 90px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ;
`;

const SyncPageCard = styled.div`
    ${BorderRadius}
    background-color: ${({ theme }) => `${theme.white}B0`};
    min-width: 300px;
    height: 100%;
    width: 30vw;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default withTheme(SyncPage);
