import type { FC } from 'react';

import { PillContainerCx } from './styles';

interface PillProps {
  text: string;
  isError: boolean;
}

const Pill: FC<PillProps> = (props) => {
  const { text, isError } = props;

  return <div css={PillContainerCx(isError)}>{text}</div>;
};

export default Pill;
