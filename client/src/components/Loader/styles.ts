import { css } from '@emotion/react';

export const loaderContainerCx = (isDarkTheme: boolean) => css`
  display: flex;
  min-height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: ${isDarkTheme ? '#121212' : '#f1f1f1'};
`;
