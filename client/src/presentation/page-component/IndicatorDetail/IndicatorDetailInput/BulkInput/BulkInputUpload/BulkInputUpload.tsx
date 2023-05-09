import { Fragment } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';

import { SheetJSFT } from '@/controller/constant/sheet';

interface BulkInputUploadProps {
  fileName: string;
  inputKey: string;
  excelError: string;
  isError: boolean;
  currentFile: any[];
  error: unknown;
  removeCurrentFile: () => void;
  handleChange: (e: any) => void;
}

const BulkInputUpload: FC<BulkInputUploadProps> = (props) => {
  const {
    fileName,
    currentFile,
    removeCurrentFile,
    inputKey,
    handleChange,
    excelError,
    isError,
    error,
  } = props;

  return (
    <Fragment>
      <Box>
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
            {currentFile.length > 0 && (
              <IconButton onClick={removeCurrentFile}>
                <DeleteIcon />
              </IconButton>
            )}
            <Button variant="outlined" component="label">
              Browse File
              <input
                hidden
                type="file"
                key={inputKey || ''}
                accept={SheetJSFT}
                onChange={handleChange}
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
    </Fragment>
  );
};

export default BulkInputUpload;
