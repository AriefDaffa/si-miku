import { useState } from 'react';
import { isEmpty } from 'lodash';
import type { FC } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { SubHeader } from '@/components/Typography';
import useBulkInputMutation from '@/repository/mutation/BulkInputMutation';

import CSVUpload from './CSVUpload';

const ToolbarSection: FC = () => {
  const [parseResult, setParseResult] = useState({});
  const { mutate } = useBulkInputMutation();

  const handleUpload = () => {
    if (isEmpty(parseResult)) {
      return;
    }

    // mutate(parseResult);
  };

  // @TODO Figure this out
  return (
    <>
      <SubHeader text="Bulk Input" />
      <Typography variant="subtitle2" sx={{ opacity: 0.7, mb: 2 }}>
        Upload file CSV dan pilih jurusan untuk memasukkan data secara bulk
      </Typography>
      <CSVUpload setParseResult={setParseResult} />
      <Divider />
      <Stack flexDirection="row" sx={{ mt: 2 }}>
        <Button variant="contained">Download Template</Button>
        <Button
          variant="outlined"
          disabled={isEmpty(parseResult) ? true : false}
          sx={{ ml: 2 }}
          onClick={handleUpload}
        >
          Upload CSV
        </Button>
      </Stack>
    </>
  );
};

export default ToolbarSection;
