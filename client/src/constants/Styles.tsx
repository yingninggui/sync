import { css, keyframes } from 'styled-components';

export const PAGE_CONTENT_WIDTH = 800;

export const InterFont = css`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

export const BoxShadow = css`
  box-shadow: 0px 2px 4px rgba(236, 237, 237, 0.4),
    0px 0px 4px rgba(142, 147, 148, 0.2);
`;

export const BorderRadius = css`
  border-radius: 4px;
`;

export const HoverTransition = (target = 'all', time = '0.1s') => css`
  transition: ${target} ${time} ease-in-out;
`;

export const Active = css`
  cursor: pointer;
  filter: brightness(50%);
  &:hover,
  &:focus {
    filter: brightness(50%);
  }
`;
export const DarkHover = (darker = false) => css`
  ${HoverTransition()}

  &:hover, &:focus {
    cursor: pointer;
    filter: brightness(${darker ? '60%' : '85%'});
  }

  &:active {
    ${Active}
  }
`;

export const Heading1 = css`
  ${InterFont}
  font-size: 28px;
  font-weight: 700;
`;

export const Heading2 = css`
  ${InterFont}
  font-size: 20px;
  font-weight: 700;
`;

export const Heading3 = css`
  ${InterFont}
  font-size: 20px;
  font-weight: 400;
`;

export const Body = css`
  ${InterFont}
  font-size: 14px;
  font-weight: 400;
`;

export const Link = css`
  ${DarkHover()}
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
`;

export const PageContent = css`
  max-width: 100%;
  max-width: ${PAGE_CONTENT_WIDTH}px;
  margin: auto;
`;

export const Card = css`
  ${BoxShadow}
  ${BorderRadius}
`;

export const Input = css`
  ${BorderRadius}
  ${Body}
  background: ${({ theme }) => theme.light1};
  color: ${({ theme }) => theme.dark1};
  border: none;
  outline: none;
  padding: 4px 8px;
`;

export const FadeInAnimation = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: inline;
    opacity: 0;
  }
  100% {
    display: inline;
    opacity: 1;
  }
`;
