import { css } from '@emotion/react';

import { ERROR, SUCCESS } from '@/theme/Colors';

export const PillContainerCx = (isError: boolean) => css`
  padding: 4px 8px;
  width: fit-content;
  border-radius: 8px;
  font-weight: bold;
  background-color: ${isError ? ERROR.lighter : SUCCESS.lighter};
  color: ${isError ? ERROR.main : SUCCESS.dark};
`;
