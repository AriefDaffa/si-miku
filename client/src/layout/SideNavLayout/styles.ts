import { css } from '@emotion/react';

import { INFO, LIGHT } from '@/theme/Colors';

export const containerCx = css`
  display: flex;
  min-height: 100%;
  overflow: hidden;
`;

export const pageContainerCx = (isDarkTheme: boolean) => css`
  flex-grow: 1;
  overflow: auto;
  min-height: 100%;
  padding-top: ${64 + 24}px;
  padding-bottom: 80px;
  background-color: ${isDarkTheme ? '' : LIGHT.main};

  @media (min-width: 1200px) {
    padding-top: 86px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;
