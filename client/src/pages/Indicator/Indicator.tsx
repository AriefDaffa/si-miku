import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { FC } from 'react';

import Grid from '@/components/UI/atoms/Grid';
import useIndicatorQuery from '@/repository/query/indicator/IndicatorQuery';
import PageContainer from '@/components/UI/molecules/PageContainer';
import { PageTitle } from '@/components/UI/atoms/Typography';

import IndicatorTable from './components/IndicatorTable';

const Indicator: FC = () => {
  const location = useLocation();

  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const { data: listIndicator, isLoading: isListIndicatorLoading } =
    useIndicatorQuery(rows, keyword, page);

  return (
    <PageContainer title="List Indikator">
      {location.pathname === '/dashboard/indicator' ? (
        <>
          <PageTitle
            title="List Indikator"
            subTitle="Menampilkan seluruh data indikator yang terdapat pada sistem"
          />
          <Grid
            spacing={2}
            gridItem={[
              <IndicatorTable
                isLoading={isListIndicatorLoading}
                listIndicator={listIndicator}
                setPage={setPage}
                rows={rows}
                setRows={setRows}
                page={page}
                keyword={keyword}
                setKeyword={setKeyword}
              />,
            ]}
          />
        </>
      ) : (
        <Outlet />
      )}
    </PageContainer>
  );
};

export default Indicator;
