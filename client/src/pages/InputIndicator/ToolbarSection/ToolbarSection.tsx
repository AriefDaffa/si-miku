import type { FC } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { SubHeader } from '@/components/Typography';
import SimpleCard from '@/components/Card/SimpleCard';

const ToolbarSection: FC = () => {
  return (
    <SimpleCard>
      <SubHeader text="Bulk Input" />
      <Stack flexDirection="row" sx={{ mt: 2 }}>
        <Button variant="contained">Download Template</Button>
        <Button variant="outlined" component="label" sx={{ ml: 2 }}>
          Upload CSV
          <input
            hidden
            type="file"
            // accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </Button>
      </Stack>
    </SimpleCard>
  );
};

export default ToolbarSection;
