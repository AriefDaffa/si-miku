import type { FC, ReactNode } from 'react';

import Container from '@mui/material/Container';

import Helmet from '@/presentation/global-component/UI/Helmet';
import Breadcrumbs from '@/presentation/global-component/UI/Breadcrumbs';

interface PageContainerProps {
  title: string;
  children: ReactNode;
}

const PageContainer: FC<PageContainerProps> = (props) => {
  const { title, children } = props;

  return (
    <>
      <Helmet title={`${title} | SI-MIKU`} />
      <Container maxWidth="xl">
        <Breadcrumbs />
        {children}
      </Container>
    </>
  );
};

export default PageContainer;
