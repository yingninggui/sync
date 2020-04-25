import React from 'react';
import styled from 'styled-components';

import { PageContent } from '../../../constants/Styles';

const ProfilePage: React.FC = () => (
  <ProfilePageWrapper>Username</ProfilePageWrapper>
);

export default ProfilePage;

const ProfilePageWrapper = styled.div`
  ${PageContent}
`;
