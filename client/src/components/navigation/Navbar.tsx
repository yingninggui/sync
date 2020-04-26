import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User, Edit, LogOut } from 'react-feather';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Modal } from 'reactstrap';

import {
  PageContent,
  Heading1,
  Input,
  GreenIcon,
} from '../../constants/Styles';
import {
  PROFILE_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
} from '../../constants/Routes';
import { isLoggedIn, logOut } from '../../utils/Auth';
import CreateSyncModal from './CreateSyncModal';

const Navbar: React.FC<RouteComponentProps> = ({ history }) => {
  const [taskModal, setTaskModal] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      history.push(LOGIN_PAGE_ROUTE);
    }
  }, [history]);

  return (
    <StyledNavbar>
      <TitleText to={HOME_PAGE_ROUTE}>Sync</TitleText>
      {/* <SearchInput placeholder="Find syncs..." /> */}
      <Icons>
        <IconWrapper
          onClick={() => setTaskModal(true)}
          onMouseDown={(e: any) => e.preventDefault()}
        >
          <Edit size={20} />
        </IconWrapper>
        <IconWrapper
          onClick={() => history.push(PROFILE_PAGE_ROUTE)}
          onMouseDown={(e: any) => e.preventDefault()}
        >
          <User size={20} />
        </IconWrapper>
        <IconWrapper
          onClick={() => {
            logOut();
            history.push(LOGIN_PAGE_ROUTE);
          }}
          onMouseDown={(e: any) => e.preventDefault()}
          last
          red
        >
          <LogOut size={20} />
        </IconWrapper>
      </Icons>
      <Modal
        isOpen={taskModal}
        toggle={() => setTaskModal(!taskModal)}
        centered
      >
        <CreateSyncModal closeModal={() => setTaskModal(false)} />
      </Modal>
    </StyledNavbar>
  );
};

export default withRouter(Navbar);

const StyledNavbar = styled.nav`
  ${PageContent}
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.light1};
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
  ${Input}
  padding: 8px 24px;
  width: 100%;
  max-width: 400px;
  margin: 0 24px;
`;

const Icons = styled.div`
  display: flex;
`;

const IconWrapper = styled.button<{ last?: boolean; red?: boolean }>`
  ${GreenIcon}
  margin-right: ${({ last }) => (last ? 0 : 8)}px;
  position: relative;
  ${({ red, theme }) => (red ? `background: ${theme.error}` : '')};
`;
