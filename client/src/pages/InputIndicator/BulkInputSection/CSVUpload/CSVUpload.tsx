import { useEffect } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

import Button from '@mui/material/Button';

import { containerCx, acceptedFileCx } from './styles';
import { defaultVal } from '../constant';
import type { DefaultVal } from './types';

interface CSVUploadProps {
  acceptedFile: any;
  getRootProps: any;
  getRemoveFileProps: any;
  ProgressBar: any;
  setParseResult: Dispatch<SetStateAction<DefaultVal>>;
}

const CSVUpload: FC<CSVUploadProps> = (props) => {
  const {
    setParseResult,
    ProgressBar,
    acceptedFile,
    getRemoveFileProps,
    getRootProps,
  } = props;

  useEffect(() => {
    if (!acceptedFile) {
      setParseResult(defaultVal);
    }
  }, []);

  return (
    <>
      <div css={containerCx}>
        <Button {...getRootProps()} variant="outlined">
          Browse
        </Button>
        <div css={acceptedFileCx}>{acceptedFile && acceptedFile.name}</div>
        {acceptedFile && (
          <Button
            {...getRemoveFileProps()}
            variant="outlined"
            color="error"
            sx={{ ml: 2 }}
          >
            Remove
          </Button>
        )}
      </div>
      <ProgressBar />
    </>
  );
};

export default CSVUpload;
