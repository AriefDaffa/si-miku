import { css } from '@emotion/react';

import { GREY } from '@/theme/Colors';

export const containerCx = css`
  display: flex;
  border: 1px dashed ${GREY[400]};
  justify-content: center;
  padding: 20px;
  margin: 10px 0 30px 0;
  width: 100%;
  max-width: 350px;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const acceptedFileCx = css`
  /* border: 1px solid #ccc; */
  height: 45;
  line-height: 2.5;
  padding-left: 10px;
  /* width: 80%; */
`;
