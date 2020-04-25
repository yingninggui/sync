import React from 'react';
import styled from 'styled-components';
import { User, Edit } from 'react-feather';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import { PageContent, Heading1, DarkHover, BorderRadius, Body } from '../../constants/Styles';
import { PROFILE_PAGE_ROUTE, HOME_PAGE_ROUTE } from '../../constants/Routes';

const Navbar: React.FC<RouteComponentProps> = ({ history }) => (
  <StyledNavbar>
    <TitleText to={HOME_PAGE_ROUTE}>Sync</TitleText>
    <SearchInput placeholder="Find syncs..." />
    <Icons>
      <IconWrapper onClick={() => {}} onMouseDown={(e: any) => e.preventDefault()}>
        <Edit size={20} />
      </IconWrapper>
      <IconWrapper onClick={() => history.push(PROFILE_PAGE_ROUTE)} onMouseDown={(e: any) => e.preventDefault()} last>
        <User size={20} />
      </IconWrapper>
    </Icons>
  </StyledNavbar>
);

export default withRouter(Navbar);

const StyledNavbar = styled.nav`
  ${PageContent}
  padding: 24px;
  display: flex;
  justify-content: space-between;
`;

const TitleText = styled(Link)`
  ${Heading1}
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    filter: brightness(85%);
  }
`;

const SearchInput = styled.input`
  ${BorderRadius}
  ${Body}
  padding: 8px 24px;
  border: none;
  outline: none;
  width: 100%;
  max-width: 400px;
  margin: 0 24px;
  background: ${({ theme }) => theme.light1};
  color: ${({ theme }) => theme.primaryGrey};
`;

const Icons = styled.div`
  display: flex;
`;

const IconWrapper = styled.button<{ last?: boolean }>`
  ${DarkHover()}
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 36px;
  width: 36px;
  background: ${({ theme }) => theme.primary};
  border: none;
  outline: none;
  margin-right: ${({ last }) => (last ? 0 : 8)}px;

  svg {
    stroke: ${({ theme }) => theme.white};
  }
`;
