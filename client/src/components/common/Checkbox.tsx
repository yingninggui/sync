import React from 'react';
import styled, { withTheme } from 'styled-components';
import { CheckSquare } from 'react-feather';

import { Active, Body, HoverTransition } from '../../constants/Styles';

interface CheckboxProps {
  theme: any;
  text: string;
  fontSize?: number;
  active: boolean;
  textColor?: string;
  onClick?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  theme,
  text,
  fontSize = 24,
  active,
  textColor,
  onClick = () => {},
}) => (
  <StyledCheckbox
    onClick={onClick}
    onMouseDown={(e: any) => e.preventDefault()}
    textColor={textColor}
    active={active}
    fontSize={fontSize}
  >
    <CheckSquare
      size={fontSize + 5}
      color={theme.success}
      opacity={active ? 1 : 0.2}
    />
    &nbsp;&nbsp;{text}
  </StyledCheckbox>
);

export default withTheme(Checkbox);

const StyledCheckbox = styled.button<{
  active: boolean;
  textColor?: string;
  fontSize: number;
}>`
  ${Body}
  ${HoverTransition()}
  ${({ active }) => (active ? Active : '')}
  background: transparent;
  font-size: ${({ fontSize }) => fontSize}px;
  border: 0;
`;
