import { css } from '@emotion/react';

export const cardContainerCx = (isCenter: boolean) => css`
  height: 100%;
  background-color: transparent;
  box-shadow: none;
  border: 1px dashed #dadada;
  padding: 4px;
  display: ${isCenter ? 'flex' : ''};
  justify-content: ${isCenter ? 'center' : ''};
  align-items: ${isCenter ? 'center' : ''};
`;
