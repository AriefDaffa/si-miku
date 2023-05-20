import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { isLoading } = props;

  return (
    <Box sx={{ py: 3 }}>
      <Button
        color="primary"
        disabled={isLoading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: PRIMARY.main,
          ':hover': { backgroundColor: PRIMARY.light },
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default SubmitButton;
