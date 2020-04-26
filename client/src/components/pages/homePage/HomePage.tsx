import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Button from '../../common/Button';
import { PageContent } from '../../../constants/Styles';
import SyncCard from './SyncCard';
import { Sync } from '../../../graphql/Schema';
import { SyncFragment } from '../../../graphql/Fragments';
import Spinner from '../../common/Spinner';

const GET_FEED = gql`
  query getPublicFeed($public: Boolean!) {
    sync(where: { public: { _eq: $public } }) {
      ...SyncInfo
      ...SyncUsers
    }
  }
  ${SyncFragment.syncInfo}
  ${SyncFragment.syncUsers}
`;

const HomePage: React.FC<any> = ({ theme }) => {
  const [publicFeed, setPublicFeed] = useState<boolean>(false);
  const { loading, error, data } = useQuery<{ sync: Sync[] }>(GET_FEED, {
    variables: { public: publicFeed },
  });

  return (
    <HomePageWrapper>
      <Button
        fontWeight={700}
        textColor={publicFeed ? theme.white : theme.primary}
        bgColor={publicFeed ? theme.primary : theme.light2}
        onClick={() => setPublicFeed(true)}
        margin="0 12px 0 0"
      >
        Public
      </Button>
      <Button
        fontWeight={700}
        textColor={publicFeed ? theme.primary : theme.white}
        bgColor={publicFeed ? theme.light2 : theme.primary}
        onClick={() => setPublicFeed(false)}
      >
        Private
      </Button>
      {loading && <Spinner />}
      {error && <div>Error</div>}
      {data && (
        <Feed>
          {data.sync.map((sync, idx) => (
            <SyncCard sync={sync} key={idx} />
          ))}
        </Feed>
      )}
    </HomePageWrapper>
  );
};

export default withTheme(HomePage);

const HomePageWrapper = styled.div`
  ${PageContent}
  padding: 32px 0;
`;

const Feed = styled.div`
  display: flex;
  flex-direction: column;
`;
