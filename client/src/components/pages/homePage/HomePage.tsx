import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';

import Button from '../../common/Button';
import { PageContent } from '../../../constants/Styles';

const HomePage: React.FC<any> = ({ theme }) => {
  const [publicFeed, setPublicFeed] = useState<boolean>(true);

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
    </HomePageWrapper>
  );
};

export default withTheme(HomePage);

const HomePageWrapper = styled.div`
  ${PageContent}
  padding-top: 16px;
`;
