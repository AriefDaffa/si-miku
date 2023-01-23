import { Helmet as ReactHelmet } from 'react-helmet-async';
import type { FC, ReactNode } from 'react';

interface HelmetProps {
  title: string;
  children?: ReactNode;
}

const Helmet: FC<HelmetProps> = (props) => {
  const { title, children } = props;

  return (
    <ReactHelmet>
      <title>{title}</title>
      {children}
    </ReactHelmet>
  );
};

export default Helmet;
