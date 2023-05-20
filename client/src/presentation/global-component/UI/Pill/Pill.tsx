import type { FC, ReactNode } from 'react';

import { PillContainerCx } from './styles';

interface PillProps {
  isError: boolean;
  isNotAdded?: boolean;
  children: ReactNode;
}

const Pill: FC<PillProps> = (props) => {
  const { children, isError, isNotAdded = false } = props;

  return <div css={PillContainerCx(isError, isNotAdded)}>{children}</div>;
};

export default Pill;
