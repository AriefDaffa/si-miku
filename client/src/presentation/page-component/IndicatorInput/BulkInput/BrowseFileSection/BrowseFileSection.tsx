import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';

interface BrowseFileSectionProps {
  fileName: string;
  sheetJSFT: string;
  fileLength: number;
  inputKey: string;
  excelError: string;
  isError: boolean;
  error: unknown;
  onRemoveFile: () => void;
  onChange: (e: any) => void;
}

const BrowseFileSection: FC<BrowseFileSectionProps> = (props) => {
  const {
    error,
    excelError,
    fileLength,
    fileName,
    inputKey,
    isError,
    onChange,
    onRemoveFile,
    sheetJSFT,
  } = props;

  return (
    <Box sx={{ my: 2 }}>
      <SubHeader text="Upload file" sx={{ pb: 1 }} />
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction={{ sm: 'row' }}
        sx={{
          border: '1px dashed #a7a7a7',
          display: 'flex',
          px: 1,
          py: 0.5,
          borderRadius: 1,
        }}
      >
        <Header text={fileName} variant="body2" />
        <Stack flexDirection="row">
          {fileLength > 0 && (
            <IconButton onClick={onRemoveFile}>
              <DeleteIcon />
            </IconButton>
          )}
          <Button variant="outlined" component="label">
            Browse File
            <input
              hidden
              type="file"
              key={inputKey || ''}
              accept={sheetJSFT}
              onChange={onChange}
            />
          </Button>
        </Stack>
      </Stack>
      {excelError !== '' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {excelError}
        </Alert>
      )}
      {isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {String(error || '')}
        </Alert>
      )}
    </Box>
  );
};

export default BrowseFileSection;
