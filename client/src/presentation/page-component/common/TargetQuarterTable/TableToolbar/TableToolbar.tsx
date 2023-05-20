import type { FC, ChangeEvent } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IosShareIcon from '@mui/icons-material/IosShare';

import SearchBar from '@/presentation/global-component/UI/SearchBar';
import Grid from '@/presentation/global-component/UI/Grid';

interface TableToolbarProps {
  handleCheckbox: () => void;
  handleKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TableToolbar: FC<TableToolbarProps> = (props) => {
  const { handleKeywordChange, handleCheckbox } = props;

  return (
    <Box sx={{ mb: 2 }}>
      <Grid
        sm={[11, 1]}
        spacing={1}
        gridItem={[
          <Card sx={{ p: 0.7, border: '1px solid #dadada' }}>
            <SearchBar
              handleKeywordChange={handleKeywordChange}
              placeholder="Cari Indikator"
            />
          </Card>,
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: '100%', width: '100%' }}
          >
            <Card sx={{ width: 'min-content', border: '1px solid #dadada' }}>
              <IconButton>
                <FilterAltIcon />
              </IconButton>
            </Card>
            <Card sx={{ width: 'min-content', border: '1px solid #dadada' }}>
              <Tooltip title="Export Data">
                <IconButton onClick={handleCheckbox}>
                  <IosShareIcon />
                </IconButton>
              </Tooltip>
            </Card>
          </Stack>,
        ]}
      />
    </Box>
  );
};

export default TableToolbar;
