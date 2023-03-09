import type { FC } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface PageTitleProps {
  title: string;
  subTitle: string;
}

const PageTitle: FC<PageTitleProps> = (props) => {
  const { title, subTitle } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'middle',
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
          Dashboard
        </Typography>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
          {subTitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default PageTitle;
