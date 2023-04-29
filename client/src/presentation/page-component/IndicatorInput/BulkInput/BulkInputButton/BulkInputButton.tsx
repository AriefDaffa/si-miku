import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface BulkInputButtonProps {
  isDisabled: boolean;
  onSubmit: () => void;
}

const BulkInputButton: FC<BulkInputButtonProps> = (props) => {
  const { isDisabled, onSubmit } = props;

  return (
    <Stack
      direction={{ sm: 'row' }}
      justifyContent="space-between"
      sx={{ mt: 2 }}
    >
      <form action={`${import.meta.env.VITE_BASE_API_URL}template`}>
        <Button variant="contained" type="submit" color="success">
          Download template
        </Button>
      </form>
      <Button variant="contained" disabled={isDisabled} onClick={onSubmit}>
        Submit
      </Button>
    </Stack>
  );
};

export default BulkInputButton;
