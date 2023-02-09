import type { FC, ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import type { SxProps } from '@mui/material';

interface CustomGridProps {
  spacing?: number;
  xs?: number[];
  md?: number[];
  sm?: number[];
  sx?: SxProps;
  gridItem: ReactNode[];
}

const CustomGrid: FC<CustomGridProps> = (props) => {
  const { gridItem, spacing = 3, xs = [], md = [], sm = [], sx = {} } = props;

  return (
    <Grid container spacing={spacing} sx={sx}>
      {gridItem.map((item, idx) => (
        <Grid item key={idx} xs={xs[idx] || 12} sm={sm[idx]} md={md[idx]}>
          {item}
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomGrid;
