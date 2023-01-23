import { useEffect } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useCSVReader, formatFileSize } from 'react-papaparse';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { SelectInput } from '@/components/Input';

import { containerCx, acceptedFileCx } from './styles';

interface CSVUploadProps {
  setParseResult: Dispatch<SetStateAction<boolean>>;
}

const CSVUpload: FC<CSVUploadProps> = (props) => {
  const { setParseResult } = props;
  const { CSVReader } = useCSVReader();
  const { control, handleSubmit } = useForm();

  return (
    <>
      {/* <SelectInput
        control={control}
        label="Jurusan"
        name="jurusan"
        defaultValue="1"
        menuItem={[
          { itemTitle: 'Teknik Informatika', itemValue: '1' },
          { itemTitle: 'Teknik Komputer', itemValue: '2' },
          { itemTitle: 'Sistem Informasi', itemValue: '3' },
          { itemTitle: 'Teknologi Informasi', itemValue: '4' },
          { itemTitle: 'Pendidikan Teknologi Informasi', itemValue: '5' },
          { itemTitle: 'Magister Ilmu Komputer', itemValue: '6' },
        ]}
      /> */}
      <Typography color="textSecondary" gutterBottom variant="overline">
        Upload File
      </Typography>
      <Box css={containerCx} component="label">
        <input hidden type="file" accept=".csv" />
      </Box>
    </>
    // <CSVReader
    //   config={{ header: true, skipEmptyLines: true }}
    //   onUploadAccepted={(results: any) => {
    //     setParseResult(results);
    //   }}
    // >
    //   {({
    //     getRootProps,
    //     acceptedFile,
    //     ProgressBar,
    //     getRemoveFileProps,
    //   }: any) => {
    //     if (!acceptedFile) {
    //       setParseResult(false);
    //     }
    //     return (
    //       <>
    //         <div css={containerCx}>
    //           <Button {...getRootProps()} variant="outlined">
    //             Browse File
    //           </Button>
    //           <div css={acceptedFileCx}>
    //             {acceptedFile && acceptedFile.name}
    //           </div>
    //           {acceptedFile && (
    //             <Button
    //               {...getRemoveFileProps()}
    //               variant="outlined"
    //               color="error"
    //               sx={{ ml: 2 }}
    //             >
    //               Remove
    //             </Button>
    //           )}
    //         </div>
    //         <ProgressBar />
    //       </>
    //     );
    //   }}
    // </CSVReader>
  );
};

export default CSVUpload;
