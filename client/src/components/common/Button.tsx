import React from 'react';
import styled from 'styled-components';

import { DarkHover, BorderRadius, Body } from '../../constants/Styles';

interface ButtonProps {
  margin?: string;
  textColor?: string;
  bgColor?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ margin, textColor, bgColor, onClick = () => {}, children }) => (
  <StyledButton
    onClick={onClick}
    onMouseDown={(e: any) => e.preventDefault()}
    textColor={textColor}
    bgColor={bgColor}
    margin={margin}
  >
    {children}
  </StyledButton>
);

export default Button;

const StyledButton = styled.button<{ margin?: string; textColor?: string; bgColor?: string }>`
  ${BorderRadius}
  ${Body}
  ${DarkHover()}
  padding: 8px 16px;
  border: none;
  outline: none;
  color: ${({ textColor, theme }) => textColor || theme.yellow};
  background: ${({ bgColor, theme }) => bgColor || theme.primaryGrey};
  margin: ${({ margin }) => margin || '0'};
`;
