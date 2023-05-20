import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SECONDARY } from '@/presentation/global-component/theme/Colors';
import { SubHeader } from '@/presentation/global-component/UI/Typography';

interface BulkInputTemplateDownloaderProps {
  link: string;
}

const BulkInputTemplateDownloader: FC<BulkInputTemplateDownloaderProps> = (
  props
) => {
  const { link } = props;

  return (
    <Box>
      <SubHeader text="Template Excel" sx={{ pb: 1 }} />
      <form action={`${link}`}>
        <Button
          size="large"
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: SECONDARY.main,
            color: 'black',
            ':hover': { backgroundColor: SECONDARY.main },
          }}
        >
          Dowload Template
        </Button>
      </form>
    </Box>
  );
};

export default BulkInputTemplateDownloader;
