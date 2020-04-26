import React from 'react';
import { Spinner as ReactstrapSpinner } from 'reactstrap';
import styled from 'styled-components';

const Spinner: React.FC = () => (
  <SpinnerWrapper>
    <ReactstrapSpinner />
  </SpinnerWrapper>
);

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 24px auto;

  div {
    color: ${({ theme }) => theme.primaryGrey} !important;
  }
`;

export default Spinner;
