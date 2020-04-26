import gql from 'graphql-tag';

import { SyncFragment, UserFragment } from './Fragments';

export const GET_FEED = gql`
  query getPublicFeed($public: Boolean!) {
    sync(where: { public: { _eq: $public } }) {
      ...SyncInfo
      ...SyncUsers
    }
  }
  ${SyncFragment.syncInfo}
  ${SyncFragment.syncUsers}
`;

export const GET_USER = gql`
  query getUser($user_id: Int!) {
    user(where: { id: { _eq: $user_id } }) {
      ...UserInfo
      ...UserFriendsCommunity
    }
  }
  ${UserFragment.userInfo}
  ${UserFragment.userFriendsCommunity}
`;

export const GET_SYNC_DETAILS = gql`
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
