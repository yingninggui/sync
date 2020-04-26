import React from 'react';
import styled from 'styled-components';
import { DarkHover } from '../../constants/Styles';

interface RoundButtonProps {
  textColor?: string;
  bgColor?: string;
  dimension?: number;
  margin?: string;
  onClick?: () => void;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  textColor,
  bgColor,
  dimension,
  margin = '0',
  onClick = () => {},
  children,
}) => (
  <RoundButtonStyle
    textColor={textColor}
    bgColor={bgColor}
    dimension={dimension}
    onClick={onClick}
    margin={margin}
    onMouseDown={(e: any) => e.preventDefault()}
  >
    {children}
  </RoundButtonStyle>
);

export default RoundButton;

const RoundButtonStyle = styled.button<{
  textColor?: string;
  bgColor?: string;
  dimension?: number;
  margin: string;
}>`
  ${DarkHover()}
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  color: ${({ textColor, theme }) => textColor || theme.yellow};
  background: ${({ bgColor, theme }) => bgColor || theme.primaryGrey};
  width: ${({ dimension }) => dimension || '100'}px;
  height: ${({ dimension }) => dimension || '100'}px;
  margin: ${({ margin }) => margin};
`;
