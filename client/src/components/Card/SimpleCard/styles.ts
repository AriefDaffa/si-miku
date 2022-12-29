import { css } from '@emotion/react';

export const cardContainerCx = (isCenter: boolean) => css`
  height: 100%;
  flex-direction: column;
  display: ${isCenter ? 'flex' : ''};
  justify-content: ${isCenter ? 'center' : ''};
  align-items: ${isCenter ? 'center' : ''};
`;
