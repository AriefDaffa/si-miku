import type { FC, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Card from '@/components/UI/atoms/Card';
import DialogPopup from '@/components/UI/atoms/DialogPopup';
import LoadingPopup from '@/components/UI/atoms/Loader/LoadingPopup';
import { Header } from '@/components/UI/atoms/Typography';

import BulkInputButton from './BulkInputButton/BulkInputButton';
import BrowseFileSection from './BrowseFileSection/BrowseFileSection';

interface BulkInputProps {
  fileName: string;
  sheetJSFT: string;
  fileLength: number;
  inputKey: string;
  excelError: string;
  isError: boolean;
  error: unknown;
  isDisabled: boolean;
  openDialog: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onRemoveFile: () => void;
  onChange: (e: any) => void;
  handleCloseDialog: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

const BulkInput: FC<BulkInputProps> = (props) => {
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
    isDisabled,
    onSubmit,
    handleCloseDialog,
    isLoading,
    openDialog,
  } = props;

  return (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Header text="Bulk Input" />
      </Box>
      <Divider sx={{ my: 2 }} />
      <BrowseFileSection
        error={error}
        excelError={excelError}
        fileLength={fileLength}
        fileName={fileName}
        inputKey={inputKey}
        isError={isError}
        onChange={onChange}
        onRemoveFile={onRemoveFile}
        sheetJSFT={sheetJSFT}
      />
      <Divider />
      <BulkInputButton isDisabled={isDisabled} onSubmit={onSubmit} />
      <DialogPopup
        title="Success!"
        bodyText="Indikator berhasil ditambahkan"
        buttonText=""
        handleClose={handleCloseDialog}
        handleAccept={handleCloseDialog}
        open={openDialog}
      />
      <LoadingPopup open={isLoading} />
    </Card>
  );
};

export default BulkInput;
