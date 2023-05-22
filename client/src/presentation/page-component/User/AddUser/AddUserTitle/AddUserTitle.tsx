import type { FC } from 'react';

import Box from '@mui/material/Box';
import { Header } from '@/presentation/global-component/UI/Typography';

const AddUserTitle: FC = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Header text="Tambah User" />
    </Box>
  );
};

export default AddUserTitle;
