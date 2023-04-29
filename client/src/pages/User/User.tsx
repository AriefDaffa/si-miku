import type { FC } from 'react';

import Container from '@mui/material/Container';

import Helmet from '@/components/UI/atoms/Helmet';
import Grid from '@/components/UI/atoms/Grid';
import useUserQuery from '@/repository/query/UserQuery/useUserQuery';
import { PageTitle } from '@/components/UI/atoms/Typography';

import TableSection from './TableSection';
import AddUserSection from './AddUserSection';

const User: FC = () => {
  const { data: operatorData, isLoading: isOperatorLoading } = useUserQuery(2);

  return (
    <>
      <Helmet title={`User| SI-MIKU`} />
      <Container maxWidth="xl">
        <PageTitle title="Manajemen User" subTitle="" />
        <Grid
          spacing={2}
          gridItem={[
            <AddUserSection />,
            <TableSection data={operatorData} isLoading={isOperatorLoading} />,
          ]}
        />
      </Container>
    </>
  );
};

export default User;
