import type { FC } from 'react';

import Box from '@mui/material/Box';
import { Header } from '@/components/UI/atoms/Typography';

const AddUserTitle: FC = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Header text="Tambah Operator" />
    </Box>
  );
};

export default AddUserTitle;
