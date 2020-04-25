import React from 'react';
import styled from 'styled-components';

interface AvatarProps {
  bgColor?: string;
  width?: number;
  height?: number;
}

const Avatar: React.FC<AvatarProps> = ({ bgColor, width, height }) => (
  <AvatarStyle bgColor={bgColor} width={width} height={height} />
);

export default Avatar;

const AvatarStyle = styled.div<{
  bgColor?: string;
  width?: number;
  height?: number;
}>`
  padding: 10px;
  margin: 20;
  display: inline-block;
  border-radius: 50%;
  background: ${({ bgColor, theme }) => bgColor || theme.yellow};
  width: ${({ width }) => width || '100'}px;
  height: ${({ height }) => height || '100'}px;
`;
