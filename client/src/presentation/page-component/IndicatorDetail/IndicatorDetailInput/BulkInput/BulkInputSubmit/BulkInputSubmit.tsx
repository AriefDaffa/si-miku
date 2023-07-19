import type { FC } from 'react';

import Button from '@mui/material/Button';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface BulkInputSubmitProps {
  fileName: string;
  handleSubmit: () => void;
}

const BulkInputSubmit: FC<BulkInputSubmitProps> = (props) => {
  const { handleSubmit, fileName } = props;

  return (
    <Button
      size="large"
      type="submit"
      variant="contained"
      sx={{
        float: 'right',
        mt: 2,
        backgroundColor: PRIMARY.main,
        ':hover': { backgroundColor: PRIMARY.light },
      }}
      onClick={handleSubmit}
      disabled={fileName === 'Browse file'}
    >
      Submit
    </Button>
  );
};

export default BulkInputSubmit;
