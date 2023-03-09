import { css } from '@emotion/react';

import { ERROR, SUCCESS } from '@/components/theme/Colors';

export const PillContainerCx = (isError: boolean) => css`
  padding: 4px 8px;
  width: fit-content;
  border-radius: 15px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  background-color: ${isError ? ERROR.lighter : SUCCESS.lighter};
  color: ${isError ? ERROR.main : SUCCESS.dark};
`;
