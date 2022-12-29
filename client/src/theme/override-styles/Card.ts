import { Theme } from '@mui/system';
import { alpha } from '@mui/material/styles';

import { GREY } from '@/theme/Colors';

const Card = (theme: Theme) => {
  const color = GREY[500];

  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(
            color,
            0.12
          )}`,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
  };
};

export default Card;
