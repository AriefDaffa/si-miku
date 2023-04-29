import { css } from '@emotion/react';

import {
  ERROR,
  GREY,
  SUCCESS,
} from '@/presentation/global-component/theme/Colors';

export const PillContainerCx = (isError: boolean, isNotAdded?: boolean) => css`
  padding: 4px 8px;
  width: fit-content;
  border-radius: 15px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  background-color: ${isNotAdded
    ? GREY[400]
    : isError
    ? ERROR.lighter
    : SUCCESS.lighter};
  color: ${isNotAdded ? GREY[800] : isError ? ERROR.main : SUCCESS.dark};
`;
