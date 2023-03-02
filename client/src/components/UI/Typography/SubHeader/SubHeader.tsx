import type { FC } from 'react';

import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material';

interface SubHeaderProps {
  text?: string;
  sx?: SxProps;
}

const SubHeader: FC<SubHeaderProps> = (props) => {
  const { text, sx } = props;

  return (
    <Typography variant="subtitle2" sx={{ opacity: 0.7, ...sx }}>
      {text}
    </Typography>
  );
};

export default SubHeader;
