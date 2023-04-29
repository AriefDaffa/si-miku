import type { FC, ReactNode } from 'react';

import { Grid as MuiGrid } from '@mui/material';
import type { SxProps } from '@mui/material';

interface GridProps {
  spacing?: number;
  xs?: number[];
  md?: number[];
  sm?: number[];
  sx?: SxProps;
  gridItem: ReactNode[];
}

const Grid: FC<GridProps> = (props) => {
  const { gridItem, spacing = 3, xs = [], md = [], sm = [], sx = {} } = props;

  return (
    <MuiGrid container spacing={spacing} sx={sx}>
      {gridItem.map((item, idx) => (
        <MuiGrid item key={idx} xs={xs[idx] || 12} sm={sm[idx]} md={md[idx]}>
          {item}
        </MuiGrid>
      ))}
    </MuiGrid>
  );
};

export default Grid;
