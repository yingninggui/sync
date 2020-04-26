import gql from 'graphql-tag';

export const CommunityFragment = {
  communityInfo: gql`
    fragment CommunityInfo on community {
      id
      name
    }
  `,
};

export const SyncFragment = {
  syncInfo: gql`
    fragment SyncInfo on sync {
      id
      cover_photo_url
      deadline
      description
      name
      public
    }
  `,
  syncCheckpoints: gql`
    fragment SyncCheckpoints on sync {
      id
      checkpoints {
        id
        name
        users_completed {
          id
          username
        }
      }
    }
  `,
  syncUsers: gql`
    fragment SyncUsers on sync {
      owner {
        id
        username
      }
      invited_users {
        id
        username
      }
    }
  `,
};

export const UserFragment = {
  userInfo: gql`
    fragment UserInfo on user {
      id
      username
    }
  `,
  userFriendsCommunity: gql`
    fragment UserFriendsCommunity on user {
      friends {
        id
        username
      }
      communities {
        id
        name
      }
    }
  `,
};
