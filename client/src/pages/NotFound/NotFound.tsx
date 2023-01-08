import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import type { FC } from 'react';

import { Button, Typography, Container, Box } from '@mui/material';

import logo404 from '@/assets/logo/404.svg';

import { notFoundCx } from './styles';

const NotFound: FC = () => {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found | SI-MIKU </title>
      </Helmet>
      <Container>
        <div css={notFoundCx}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src={logo404}
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Go to Home
          </Button>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
