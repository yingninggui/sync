import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Dropdown as ReactstrapDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

import {
  DarkHover,
  BorderRadius,
  Body,
  BoxShadow,
} from '../../constants/Styles';

interface DropdownProps {
  items: string[];
  selectedIndex: number;
  setSelectedIndex: (idx: number) => void;
  margin?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedIndex,
  setSelectedIndex,
  margin = '0',
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <StyledDropdown
      margin={margin}
      isOpen={dropdownOpen}
      toggle={() => setDropdownOpen(!dropdownOpen)}
    >
      <DropdownToggle caret>{items[selectedIndex]}</DropdownToggle>
      <DropdownMenu>
        {items.map((item, idx) => (
          <DropdownItem key={idx} onClick={() => setSelectedIndex(idx)}>
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </StyledDropdown>
  );
};

export default Dropdown;

const StyledDropdown = styled(ReactstrapDropdown)<{ margin?: string }>`
  ${BorderRadius}
  ${Body}
  font-weight: 700;
  border: none;
  outline: none;
  margin: ${({ margin }) => margin || '0'};
  width: 100%;

  button {
    color: ${({ theme }) => theme.dark1} !important;
    background: ${({ theme }) => theme.light1} !important;
    border: none;
    box-shadow: none !important;
    padding: 8px 16px;
    ${Body}
  }

  .dropdown-menu {
    margin-top: 8px;
    color: ${({ theme }) => theme.dark1} !important;
    background: ${({ theme }) => theme.light1} !important;
    border: none;
    ${BorderRadius}
    ${BoxShadow}
    padding: 0;
    width: max-content;
  }

  .dropdown-item {
    ${BorderRadius}
    ${DarkHover()}
    padding: 8px;
  }
`;
