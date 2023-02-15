import { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { isEmpty } from 'lodash';
import type { FC } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import CustomCard from '@/components/CustomCard';
import useInputIndicatorMutation from '@/repository/mutation/InputIndicatorMutation';
import { Header, SubHeader } from '@/components/Typography';

import CSVUpload from './CSVUpload';
import { defaultVal } from './constant';
import LoadingPopup from '@/components/Loader/LoadingPopup';

// @TODO ADD Error handling
const BulkInputSection: FC = () => {
  const [openLoading, setOpenLoading] = useState(false);
  const [parseResult, setParseResult] = useState(defaultVal);
  const { CSVReader } = useCSVReader();

  const { mutate } = useInputIndicatorMutation();

  const handleUpload = () => {
    if (isEmpty(parseResult)) {
      return;
    }

    setOpenLoading(true);
    mutate(parseResult, {
      onSuccess: () => setOpenLoading(false),
      onError: () => setOpenLoading(false),
    });
  };

  return (
    <CustomCard>
      <Header text="Bulk Input" />
      <SubHeader text="Upload file CSV untuk memasukkan data secara bulk" />
      <Divider sx={{ mt: 2, mb: 3 }} />
      <CSVReader
        config={{ header: true, skipEmptyLines: true }}
        onUploadAccepted={(results: any) => {
          setParseResult({
            indicator: results.data.map((item: any) => {
              return {
                indicator_code: item.indicator_code,
                indicator_name: item.indicator_name,
              };
            }),
          });
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }: any) => {
          return (
            <CSVUpload
              setParseResult={setParseResult}
              acceptedFile={acceptedFile}
              getRootProps={getRootProps}
              getRemoveFileProps={getRemoveFileProps}
              ProgressBar={ProgressBar}
            />
          );
        }}
      </CSVReader>
      <Divider />
      <Stack flexDirection="row" sx={{ mt: 2 }}>
        <Button variant="contained">Download Template</Button>
        <Button
          variant="outlined"
          disabled={
            parseResult.indicator.length === 1 &&
            parseResult.indicator[0].indicator_code === ''
          }
          sx={{ ml: 2 }}
          onClick={handleUpload}
        >
          Upload CSV
        </Button>
      </Stack>
      <LoadingPopup open={openLoading} />
    </CustomCard>
  );
};

export default BulkInputSection;
