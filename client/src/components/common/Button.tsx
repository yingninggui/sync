import React from 'react';
import styled from 'styled-components';

import {
  DarkHover,
  BorderRadius,
  Body,
  BoxShadow,
} from '../../constants/Styles';

interface ButtonProps {
  textColor?: string;
  bgColor?: string;
  fontWeight?: number;
  margin?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
  textColor,
  bgColor,
  fontWeight = 400,
  margin = '0',
  onClick = () => {},
  type = 'button',
  children,
}) => (
  <StyledButton
    onClick={onClick}
    onMouseDown={(e: any) => e.preventDefault()}
    textColor={textColor}
    bgColor={bgColor}
    fontWeight={fontWeight}
    margin={margin}
    type={type}
  >
    {children}
  </StyledButton>
);

export default Button;

const StyledButton = styled.button<{
  margin?: string;
  textColor?: string;
  bgColor?: string;
  fontWeight?: number;
}>`
  ${BorderRadius}
  ${Body}
  ${DarkHover()}
  ${BoxShadow}
  padding: 4px 16px;
  font-weight: 700;
  border: none;
  outline: none;
  color: ${({ textColor, theme }) => textColor || theme.yellow};
  background: ${({ bgColor, theme }) => bgColor || theme.primaryGrey};
  margin: ${({ margin }) => margin || '0'};
`;
