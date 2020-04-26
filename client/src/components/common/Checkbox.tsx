import React from 'react';
import styled, { withTheme } from 'styled-components';
import { CheckSquare } from 'react-feather';

import { Body, DarkHover } from '../../constants/Styles';

interface CheckboxProps {
  theme: any;
  text: string;
  active: boolean;
  onClick?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  theme,
  text,
  active,
  onClick = () => {},
}) => (
  <StyledCheckbox
    onClick={onClick}
    onMouseDown={(e: any) => e.preventDefault()}
    active={active}
  >
    <CheckSquare size={24} color={active ? theme.primary : theme.light4} />
    &nbsp;&nbsp;{text}
  </StyledCheckbox>
);

export default withTheme(Checkbox);

const StyledCheckbox = styled.button<{
  active: boolean;
}>`
  ${Body}
  ${DarkHover()}
  background: none;
  border: 0;
  font-size: 18px;
  display: flex;
  color: ${({ theme }) => theme.dark1};
`;
