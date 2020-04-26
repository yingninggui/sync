import React from 'react';
import styled from 'styled-components';
import { Body, DarkHover } from '../../constants/Styles';

interface CircleButtonProps {
  textColor?: string;
  bgColor?: string;
  dimension?: number;
  onClick?: () => void;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  textColor,
  bgColor,
  dimension,
  onClick = () => {},
  children,
}) => (
  <CircleButtonStyle
    textColor={textColor}
    bgColor={bgColor}
    dimension={dimension}
    onClick={onClick}
    onMouseDown={(e: any) => e.preventDefault()}
  >
    {children}
  </CircleButtonStyle>
);

export default CircleButton;

const CircleButtonStyle = styled.button<{
  textColor?: string;
  bgColor?: string;
  dimension?: number;
}>`
  ${DarkHover()}
  ${Body}
  font-size: 20px;
  padding: 10px;
  margin: 20;
  border-radius: 50%;
  border: none;
  outline: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ textColor, theme }) => textColor || theme.yellow};
  background: ${({ bgColor, theme }) => bgColor || theme.primaryGrey};
  width: ${({ dimension }) => dimension || '100'}px;
  height: ${({ dimension }) => dimension || '100'}px;
`;
