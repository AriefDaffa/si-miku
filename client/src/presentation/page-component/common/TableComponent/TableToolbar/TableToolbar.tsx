import type { FC, ChangeEvent, ReactNode } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IosShareIcon from '@mui/icons-material/IosShare';

import SearchBar from '@/presentation/global-component/UI/SearchBar';

interface TableToolbarProps {
  handleCheckbox: () => void;
  handleKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  FilterComponent?: ReactNode;
  withExportButton?: boolean;
}

const TableToolbar: FC<TableToolbarProps> = (props) => {
  const {
    handleKeywordChange,
    handleCheckbox,
    FilterComponent = <div></div>,
    withExportButton = false,
  } = props;

  return (
    <Box sx={{ my: 1 }}>
      <Stack flexDirection="row" gap={1} sx={{ width: '100%' }}>
        <Card sx={{ p: 0.7, border: '1px solid #dadada', flex: 1 }}>
          <SearchBar
            handleKeywordChange={handleKeywordChange}
            placeholder="Search"
          />
        </Card>
        {withExportButton && (
          <Card sx={{ width: 'min-content', border: '1px solid #dadada' }}>
            <Tooltip title="Export Data">
              <IconButton onClick={handleCheckbox}>
                <IosShareIcon />
              </IconButton>
            </Tooltip>
          </Card>
        )}
        {/* <Card sx={{ width: 'min-content', border: '1px solid #dadada' }}>
          <Tooltip title="Export Data">
            <IconButton onClick={handleCheckbox}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Card> */}
      </Stack>
      <Box>{FilterComponent}</Box>
    </Box>
  );
};

export default TableToolbar;
