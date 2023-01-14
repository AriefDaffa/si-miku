import type { FC } from 'react';

import Button from '@mui/material/Button';

import { SubHeader } from '@/components/Typography';
import SimpleCard from '@/components/Card/SimpleCard';
import Flexer from '@/components/Flexer';

const ToolbarSection: FC = () => {
  return (
    <SimpleCard>
      <SubHeader text="Bulk Input" />
      <Flexer flexDirection="row">
        <Button variant="contained" sx={{ mr: 2, mt: 2 }}>
          Download Template
        </Button>
        <Button variant="outlined" sx={{ mt: 2 }}>
          Upload CSV
        </Button>
      </Flexer>
    </SimpleCard>
  );
};

export default ToolbarSection;
