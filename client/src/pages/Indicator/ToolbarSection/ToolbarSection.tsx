import { Helmet } from 'react-helmet';
import type { FC } from 'react';

import { Container, Typography, Box, Grid } from '@mui/material';
import SimpleCard from '@/components/Card/SimpleCard';

const ToolbarSection: FC = () => {
  return (
    <SimpleCard isCenter>
      <div>Hello world</div>
    </SimpleCard>
  );
};

export default ToolbarSection;
