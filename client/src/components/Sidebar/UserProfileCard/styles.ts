import { css } from '@emotion/react';

import { GREY } from '@/theme/Colors';

export const profileCardWrapperCx = css`
  display: flex;
  flex-direction: column;
  height: 120px;
  justify-content: center;
  padding: 0 16px;
`;

export const profileCardCx = (isDarkTheme: boolean) => css`
  display: flex;
  align-items: center;
  border: 1px dashed ${isDarkTheme ? GREY[600] : GREY[400]};
  border-radius: 8px;
  padding: 16px;
  background-color: ${isDarkTheme ? '' : GREY[200]};
`;
