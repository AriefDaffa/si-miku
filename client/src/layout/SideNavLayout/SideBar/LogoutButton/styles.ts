import { css } from '@emotion/react';

import { DARK, LIGHT } from '@/theme/Colors';

export const ButtonWrapperCx = (isDarkTheme: boolean) => css`
  display: flex;
  flex-direction: row;
  height: 48;
  width: 100%;
  padding: 16px;
  position: relative;
  text-transform: capitalize;
  color: ${isDarkTheme ? LIGHT.main : DARK.main};

  &:hover {
    cursor: pointer;
    background-color: ${isDarkTheme ? DARK.lighter : LIGHT.darker};
  }
`;

export const navIconCx = css`
  width: 22;
  height: 22;
  padding: 0 16px 0 8px;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;
