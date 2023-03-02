import type { FC, ReactNode } from 'react';

import { PillContainerCx } from './styles';

interface PillProps {
  isError: boolean;
  children: ReactNode;
}

const Pill: FC<PillProps> = (props) => {
  const { children, isError } = props;

  return <div css={PillContainerCx(isError)}>{children}</div>;
};

export default Pill;
