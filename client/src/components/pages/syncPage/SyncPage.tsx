import React, { useState, useEffect } from 'react';
import { PhoneMissed, MicOff } from 'react-feather';
import { Row, Col } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled, { withTheme } from 'styled-components';
import url from 'url';
import gql from 'graphql-tag';
import _ from 'lodash';

import Avatar from '../../common/Avatar';
import RoundButton from '../../common/RoundButton';
import Checkbox from '../../common/Checkbox';
import { BorderRadius } from '../../../constants/Styles';

import { User, Checkpoint, Sync } from '../../../graphql/Schema';
import { SyncFragment } from '../../../graphql/Fragments';

const GET_SYNC_DETAILS = gql`
  query getSyncDetails($id: Int!) {
    sync(where: { id: { _eq: $id } }) {
      ...SyncInfo
      ...SyncUsers
      ...SyncCheckpoints
    }
  }
  ${SyncFragment.syncInfo}
  ${SyncFragment.syncUsers}
  ${SyncFragment.syncCheckpoints}
`;

const SET_CHECKPOINT_COMPLETED = gql`
  mutation setCheckpointCompleted($checkpointId: Int!, $userId: Int!) {
    insert_user_completed_checkpoint_one(
      object: { checkpoint_id: $checkpointId, user_id: $userId }
    ) {
      checkpoint_id
      user_id
    }
  }
`;

const DELETE_CHECKPOINT_COMPLETED = gql`
  mutation deleteCheckpointCompleted($checkpointId: Int!, $userId: Int!) {
    delete_user_completed_checkpoint(
      where: {
        checkpoint_id: { _eq: $checkpointId }
        user_id: { _eq: $userId }
      }
    ) {
      returning {
        checkpoint_id
        user_id
      }
    }
  }
`;

const SyncPage: React.FC<any> = ({ theme, match }) => {
  const syncID = parseInt(match.params.syncID, 10);
  const { loading, error, data } = useQuery<{ sync: Sync[] }>(
    GET_SYNC_DETAILS,
    {
      variables: { id: syncID },
    },
  );

  const userId = 1;

  if (data && data.sync.length < 1) {
    throw new Error('No sync with this ID found');
  }
  const users: Array<User> = _.get(data, 'sync[0].invited_users', []);
  const checkpoints: Checkpoint[] = _.get(data, 'sync[0].checkpoints', []);

  // set checkpoint completed == false
  const [setCompletedMutation] = useMutation<{
    insert_user_completed_checkpoint_one: Checkpoint;
  }>(SET_CHECKPOINT_COMPLETED, {});

  // set checkpoint completed == true
  const [deleteCompletedMutation] = useMutation<{
    delete_user_completed_checkpoint: Checkpoint;
  }>(DELETE_CHECKPOINT_COMPLETED, {});

  const [cSelected, setCSelected] = useState<number[]>([]);
  const onCheckboxBtnClick = (selectedId: any) => {
    const index: number = cSelected.indexOf(selectedId);
    if (index < 0) {
      cSelected.push(selectedId);
      setCompletedMutation({
        variables: { checkpointId: selectedId, userId },
      });
    } else {
      cSelected.splice(index, 1);
      deleteCompletedMutation({
        variables: { checkpointId: selectedId, userId },
      });
    }
    setCSelected([...cSelected]);
  };

  // on load, get checkpoints that current user has completed and update list
  const userCompleted: number[] = checkpoints
    .filter((c) => c.users_completed.filter((u) => u.id === userId).length > 0)
    .map((c) => c.id);

  useEffect(() => {
    setCSelected(userCompleted);
  }, [userCompleted.length]);

  return (
    <SyncPageWrapper>
      <div></div>
      <Row>{users.map((user) => ({ name: user.username })).map(Avatar)}</Row>
      <Row>
        <Col style={{ padding: '0px 50px' }}>
          <SyncPageCard>
            <h3 style={{ textAlign: 'center' }}>Checkpoints</h3>
            {checkpoints.map(({ id: checkpointId, name }) => (
              <Checkbox
                key={checkpointId}
                onClick={() => onCheckboxBtnClick(checkpointId)}
                active={cSelected.includes(checkpointId)}
                text={name}
                fontSize={18}
              />
            ))}
          </SyncPageCard>
        </Col>
        <Col style={{ padding: '0px 50px' }}>
          <SyncPageCard>
            <h3 style={{ textAlign: 'center' }}>People who have finished:</h3>

            <h3 style={{ textAlign: 'center' }}>
              People who are still working:
            </h3>
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default withTheme(SyncPage);
