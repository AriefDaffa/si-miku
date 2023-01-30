import { css } from '@emotion/react';

import { LIGHT } from '@/theme/Colors';

export const containerCx = css`
  height: 100vh;
  overflow-y: hidden;
  display: flex;
`;

export const pageContainerCx = () => css`
  flex-grow: 1;
  overflow: auto;
  min-height: 100%;
  padding-bottom: 80px;
  background-color: ${LIGHT.main};

  @media (min-width: 1200px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;
