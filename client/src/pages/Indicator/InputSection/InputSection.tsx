import { useMemo } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Card from '@/components/UI/atoms/Card';
import Grid from '@/components/UI/atoms/Grid';
import { Header } from '@/components/UI/atoms/Typography';
import { GREY } from '@/components/theme/Colors';

import FormInput from './FormInput';
import BulkInput from './BulkInput';

interface InputSectionProps {}

const InputSection: FC<InputSectionProps> = (props) => {
  return (
    <Card>
      <Stack>
        <Header text="Tambah indikator baru" />
      </Stack>
      <Box sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}>
        <Grid spacing={1} gridItem={[<BulkInput />, <FormInput />]} />
      </Box>
    </Card>
  );
};

export default InputSection;
