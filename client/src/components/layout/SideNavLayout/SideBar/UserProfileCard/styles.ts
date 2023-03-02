import { css } from '@emotion/react';

import { INFO } from '@/components/theme/Colors';

export const profileCardWrapperCx = css`
  display: flex;
  height: 120px;
  padding: 0 8px;
  justify-content: center;
  flex-direction: column;
`;

export const profileCardCx = (isDarkTheme: boolean) => css`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 16px 8px;
  justify-content: center;
  background-color: ${isDarkTheme ? '#212121' : INFO.darker};
`;
