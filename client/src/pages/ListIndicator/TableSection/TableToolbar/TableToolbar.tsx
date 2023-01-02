import type { FC } from 'react';

import { Box, TextField, InputAdornment, SvgIcon } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TableToolbar: FC = () => {
  return (
    <Box
      sx={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}
    >
      <Box sx={{ maxWidth: 500 }}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          placeholder="Search Indicator"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default TableToolbar;
