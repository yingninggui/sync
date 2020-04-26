import React, { useState, useEffect, ChangeEvent } from 'react';
import { PhoneMissed, MicOff, Plus } from 'react-feather';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled, { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import url from 'url';
import gql from 'graphql-tag';
import _, { Dictionary } from 'lodash';

import { currentUserId, currentUsername } from '../../../utils/Auth';
import Avatar from '../../common/Avatar';
import RoundButton from '../../common/RoundButton';
import Checkbox from '../../common/Checkbox';
import {
  BorderRadius,
  Heading2,
  Card,
  GreenIcon,
  Input,
} from '../../../constants/Styles';

import { User, Checkpoint, Sync } from '../../../graphql/Schema';
import { HOME_PAGE_ROUTE } from '../../../constants/Routes';
import { GET_SYNC_DETAILS } from '../../../graphql/Queries';

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

const INSERT_CHECKPOINT = gql`
  mutation insertCheckpoint($name: String!, $sync_id: Int!) {
    insert_checkpoint_one(object: { name: $name, sync_id: $sync_id }) {
      id
      name
    }
  }
`;

const DELETE_CHECKPOINT = gql`
  mutation deleteCheckpoint($checkpointId: Int!) {
    delete_checkpoint(where: { checkpoint_id: { _eq: $checkpointId } }) {
      returning {
        checkpoint_id
      }
    }
  }
`;

const AvatarMini: React.FC<any> = (props: User, key) => (
  <AvatarWrapper margin={5} key={key}>
    <Avatar name={props.username} dimension={30} letterSize={18} />
  </AvatarWrapper>
);

const getDoneUsers = (
  users: User[],
  checkpoints: Checkpoint[],
): [User[], User[]] => {
  const userMap: Dictionary<User> = _.keyBy(users, (user) => user.id);
  const idCounts = _.chain(checkpoints)
    .map((c) => c.users_completed.map((u) => u.id))
    .flatten()
    .countBy()
    .value();

  const usersDoneAll: User[] = [];
  const stillWorking: User[] = [];

  Object.keys(userMap).forEach((key) => {
    const value: number = idCounts[key] || 0;
    const user: User = userMap[key];
    if (value === checkpoints.length) {
      usersDoneAll.push(user);
    } else {
      stillWorking.push(user);
    }
  });

  return [usersDoneAll, stillWorking];
};

const SyncPage: React.FC<any> = ({ theme, match, history, peers }) => {
  const syncID = parseInt(match.params.syncID, 10);
  const [checkpointInput, setCheckpointInput] = useState<string>('');

  const { data } = useQuery<{ sync: Sync[] }>(GET_SYNC_DETAILS, {
    variables: { id: syncID },
  });
  const refetchQueries = [
    { query: GET_SYNC_DETAILS, variables: { id: syncID } },
  ];

  const userId: number = currentUserId();
  const myUsername: string = currentUsername();

  if (data && data.sync.length < 1) {
    throw new Error('No sync with this ID found');
  }
  const users: Array<User> = [];
  if (data) {
    if (data.sync[0].owner) {
      users.push(data.sync[0].owner);
    }
    users.push(...data.sync[0].invited_users);
  }
  const checkpoints: Checkpoint[] = _.get(data, 'sync[0].checkpoints', []);
  const [usersDoneAll, stillWorking] = getDoneUsers(users, checkpoints);

  /* Mutations */
  const [setCompletedMutation] = useMutation<{
    insert_user_completed_checkpoint_one: Checkpoint;
  }>(SET_CHECKPOINT_COMPLETED, { refetchQueries });

  const [deleteCompletedMutation] = useMutation(DELETE_CHECKPOINT_COMPLETED, {
    refetchQueries,
  });

  const [insertCheckpointMutation] = useMutation<{
    insert_checkpoint_one: Checkpoint;
  }>(INSERT_CHECKPOINT, {
    refetchQueries,
    onCompleted: () => setCheckpointInput(''),
  });

  const [deleteCheckpointMutation] = useMutation(DELETE_CHECKPOINT, {
    refetchQueries,
  });

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
      <Row>
        {[myUsername, ...peers].map((username: string, i: number) => (
          <AvatarWrapper key={i}>
            <Avatar name={username} letterSize={48} />
          </AvatarWrapper>
        ))}
      </Row>
      <Row>
        <Col style={{ padding: '0px 40px' }}>
          <SyncPageCard>
            <BoxHeading>Checkpoints</BoxHeading>
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                insertCheckpointMutation({
                  variables: { name: checkpointInput, sync_id: syncID },
                });
              }}
            >
              <Row
                style={{ justifyContent: 'space-between', marginBottom: '8px' }}
              >
                <TextInput
                  placeholder="Finish X..."
                  value={checkpointInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCheckpointInput(e.target.value)
                  }
                />
                <IconWrapper type="submit">
                  <Plus />
                </IconWrapper>
              </Row>
            </form>
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
        <Col style={{ padding: '0px 40px' }}>
          <SyncPageCard>
            <BoxHeading>
              Done all checkpoints{' '}
              <span role="img" aria-label="party popper">
                🎉
              </span>
            </BoxHeading>
            <Row style={{ marginBottom: '20px' }}>
              {usersDoneAll.length === 0 &&
                'No one yet, be the first one here!'}
              {usersDoneAll.map(AvatarMini)}
            </Row>
            <BoxHeading>
              Still working{' '}
              <span role="img" aria-label="man technologist">
                👨‍💻
              </span>
            </BoxHeading>
            <Row>
              {stillWorking.length === 0 && "Everyone's all done!"}
              {stillWorking.map(AvatarMini)}
            </Row>
          </SyncPageCard>
        </Col>
      </Row>
      <Row>
        <RoundButton
          textColor={theme.white}
          bgColor={theme.primary}
          dimension={80}
          margin="0px 20px"
        >
          <MicOff size={40} />
        </RoundButton>
        <RoundButton
          textColor={theme.white}
          bgColor={theme.error}
          dimension={80}
          margin="0px 20px"
          onClick={() => history.push(HOME_PAGE_ROUTE)}
        >
          <PhoneMissed size={40} />
        </RoundButton>
      </Row>
    </SyncPageWrapper>
  );
};

export default withTheme(withRouter(SyncPage));

const SyncPageWrapper = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url(${url.resolve(process.env.PUBLIC_URL || '', '/img/bg.jpg')})
      ${({ theme }) => theme.primary} no-repeat center center fixed;
  background-size: cover;
  height: calc(100% - 90px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 48px;
`;

const SyncPageCard = styled.div`
  ${BorderRadius}
  ${Card}
  background-color: rgba(255, 255, 255, 0.95);
  min-width: 300px;
  height: 100%;
  width: 400px;
  max-width: 30vw;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const AvatarWrapper = styled.div<{
  margin?: number;
}>`
  margin: 0px ${({ margin }) => margin || 16}px;
`;

const IconWrapper = styled.button`
  ${GreenIcon}
`;

const BoxHeading = styled.div`
  ${Heading2}
  color: ${({ theme }) => theme.primaryGrey};
  margin-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  color: ${({ theme }) => theme.dark3};
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.dark3};
`;

const TextInput = styled.input`
  ${Input}
  background: ${({ theme }) => theme.light3};
  width: 100%;
  margin-right: 32px;
`;
