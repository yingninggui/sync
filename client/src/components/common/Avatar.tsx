import React from 'react';
import styled from 'styled-components';

interface AvatarProps {
  dimension?: number;
  letterSize?: number;
  name?: string;
}

const Avatar: React.FC<AvatarProps> = ({ dimension, letterSize, name }) => (
  <AvatarStyle dimension={dimension} letterSize={letterSize}>
    {name && name.length > 0 ? name[0].toUpperCase() : ''}
  </AvatarStyle>
);

export default Avatar;

const AvatarStyle = styled.div<{
  dimension?: number;
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
  background: ${({ theme }) => theme.yellow};
  width: ${({ dimension }) => dimension || '100'}px;
  height: ${({ dimension }) => dimension || '100'}px;
`;
