import React from 'react';
import styled from 'styled-components';
import { BoxShadow } from '../../constants/Styles';

const gradientPairings = [
  ['#ffa68e', '#861657'],
  ['#FC575E', '#F7B42C'],
  ['#8693AB', '#BDD4E7'],
  ['#FF928B', '#FFAC81'],
  ['#3EADCF', '#ABE9CD'],
  ['#F9D976', '#F39F86'],
  ['#F53844', '#42378F'],
  ['#A4BFEF', '#6A93CB'],
  ['#087EE1', '#05E8BA'],
  ['#D1BAD2', '#D1BAD2'],
];

function getGradient(username: string): string[] {
  if (username.length === 0) return gradientPairings[0];
  let hash = 0;
  for (let i = 0; i < username.length; i += 1) {
    hash += username.charCodeAt(i);
  }
  return gradientPairings[hash % 10];
}

interface AvatarProps {
  dimension?: number;
  letterSize?: number;
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ dimension, letterSize, name }) => (
  <AvatarStyle
    dimension={dimension}
    letterSize={letterSize}
    bg={getGradient(name)}
  >
    {name && name.length > 0 ? name[0].toUpperCase() : ''}
  </AvatarStyle>
);

export default Avatar;

const AvatarStyle = styled.div<{
  dimension?: number;
  letterSize?: number;
  bg: string[];
}>`
  ${BoxShadow}
  padding: 10px;
  margin: 20;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.white};
  font-size: ${({ letterSize }) => letterSize || '30'}px;
  background: ${({ theme }) => theme.red};
  background-image: linear-gradient(${({ bg }) => `${bg[0]}, ${bg[1]}`});
  width: ${({ dimension }) => dimension || '100'}px;
  height: ${({ dimension }) => dimension || '100'}px;
  min-width: ${({ dimension }) => dimension || '100'}px;
  min-height: ${({ dimension }) => dimension || '100'}px;
`;
