import type { FC, ReactNode } from 'react';

import Grid from '@mui/material/Grid';

interface CustomGridProps {
  spacing?: number;
  xs?: number[];
  md?: number[];
  sm?: number[];
  gridItem: ReactNode[];
}

const CustomGrid: FC<CustomGridProps> = (props) => {
  const { gridItem, spacing = 3, xs = [], md = [], sm = [] } = props;

  return (
    <Grid container spacing={spacing}>
      {gridItem.map((item, idx) => (
        <Grid item key={idx} xs={xs[idx] || 12} sm={sm[idx]} md={md[idx]}>
          {item}
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomGrid;
