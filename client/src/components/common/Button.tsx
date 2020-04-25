import React from 'react';
import styled from 'styled-components';

import { DarkHover, BorderRadius, Body } from '../../constants/Styles';

interface ButtonProps {
  textColor?: string;
  bgColor?: string;
  fontWeight?: number;
  margin?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  textColor,
  bgColor,
  fontWeight = 400,
  margin = '0',
  onClick = () => {},
  children,
}) => (
  <StyledButton
    onClick={onClick}
    onMouseDown={(e: any) => e.preventDefault()}
    textColor={textColor}
    bgColor={bgColor}
    fontWeight={fontWeight}
    margin={margin}
  >
    {children}
  </StyledButton>
);

export default Button;

const StyledButton = styled.button<{ margin?: string; textColor?: string; bgColor?: string; fontWeight?: number }>`
  ${BorderRadius}
  ${Body}
  ${DarkHover()}
  padding: 4px 16px;
  font-weight: 700;
  border: none;
  outline: none;
  color: ${({ textColor, theme }) => textColor || theme.yellow};
  background: ${({ bgColor, theme }) => bgColor || theme.primaryGrey};
  margin: ${({ margin }) => margin || '0'};
`;
