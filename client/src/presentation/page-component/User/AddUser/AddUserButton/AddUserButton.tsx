import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const AddUserButton: FC = () => {
  return (
    <Stack flexDirection="row-reverse">
      <Box sx={{ py: 2 }}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Stack>
  );
};

export default AddUserButton;
