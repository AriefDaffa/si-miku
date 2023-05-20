import { noop } from 'lodash';
import { Fragment } from 'react';
import type { FC, ReactNode } from 'react';

import Container from '@mui/material/Container';

import Flexer from '@/presentation/global-component/UI/Flexer';
import Helmet from '@/presentation/global-component/UI/Helmet';
import Breadcrumbs from '@/presentation/global-component/UI/Breadcrumbs';
import YearPicker from '@/presentation/global-component/UI/YearPicker';

import PageTitle from './PageTitle';

interface PageContainerProps {
  title: string;
  subTitle: string;
  children: ReactNode;
  enableYearPicker?: boolean;
  yearValue?: string;
  handleSelectYear?: (year: string | null) => void;
}

const PageContainer: FC<PageContainerProps> = (props) => {
  const {
    title,
    subTitle,
    children,
    enableYearPicker = false,
    yearValue = '',
    handleSelectYear = noop,
  } = props;

  return (
    <Fragment>
      <Helmet title={`${title} | SI-MIKU`} />
      <Container maxWidth="xl">
        <Breadcrumbs />
        <Flexer>
          <PageTitle title={title} subTitle={subTitle} />
          {enableYearPicker && (
            <YearPicker
              yearValue={yearValue}
              handleSelectYear={handleSelectYear}
            />
          )}
        </Flexer>
        {children}
      </Container>
    </Fragment>
  );
};

export default PageContainer;
