import React from 'react';
import { Navbar as ReactstrapNavbar } from 'reactstrap';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <StyledNavbar>Sync</StyledNavbar>
  )
}

export default Navbar;

const StyledNavbar = styled(ReactstrapNavbar)`
  padding: 24px;
`;
