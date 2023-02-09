import { useState } from 'react';
import { isEmpty } from 'lodash';
import type { FC } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import CustomCard from '@/components/CustomCard';
import useBulkInputMutation from '@/repository/mutation/BulkInputMutation';
import { Header, SubHeader } from '@/components/Typography';

import CSVUpload from './CSVUpload';

const BulkInputSection: FC = () => {
  const [parseResult, setParseResult] = useState({});
  const { mutate } = useBulkInputMutation();

  const handleUpload = () => {
    if (isEmpty(parseResult)) {
      return;
    }

    // mutate(parseResult);
  };

  return (
    <CustomCard>
      <Header text="Bulk Input" />
      <SubHeader text="Upload file CSV dan pilih jurusan untuk memasukkan data secara bulk" />
      <Divider sx={{ mt: 2, mb: 3 }} />
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
    </CustomCard>
  );
};

export default BulkInputSection;
