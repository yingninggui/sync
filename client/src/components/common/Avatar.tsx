import React from 'react';
import styled from 'styled-components';

interface AvatarProps {
  bgColor?: string;
  width?: number;
  height?: number;
  letterSize?: number;
  firstLetter?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  bgColor,
  width,
  height,
  letterSize,
  firstLetter,
}) => (
  <AvatarStyle
    bgColor={bgColor}
    width={width}
    height={height}
    letterSize={letterSize}
  >
    {firstLetter}
  </AvatarStyle>
}

export default Avatar;

const AvatarStyle = styled.div<{
  bgColor?: string;
  width?: number;
  height?: number;
  letterSize?: number;
}>`
  padding: 10px;
  margin: 20;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.white};
  font-size: ${({ letterSize }) => letterSize || '30'}px;
  background: ${({ bgColor, theme }) => bgColor || theme.yellow};
  width: ${({ width }) => width || '100'}px;
  height: ${({ height }) => height || '100'}px;
`;
