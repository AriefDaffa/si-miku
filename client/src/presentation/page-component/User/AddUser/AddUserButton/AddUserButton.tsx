import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const AddUserButton: FC = () => {
  return (
    <Box sx={{ float: 'right', py: 2 }}>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default AddUserButton;
