import { Fragment } from 'react';
import type { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Helmet from '@/components/UI/atoms/Helmet';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';

interface LoginContainerProps {
  loading: boolean;
  children: ReactNode;
}

const LoginContainer: FC<LoginContainerProps> = (props) => {
  const { children, loading } = props;

  return (
    <Fragment>
      <Helmet title="Login | SI-MIKU" />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="sm">
          {children}
          <LoadingPopup open={loading} />
        </Container>
      </Box>
    </Fragment>
  );
};

export default LoginContainer;
