import { useState, useCallback } from 'react';
import { read, utils } from 'xlsx';
import { useQueryClient } from 'react-query';
import type { FC, Dispatch, SetStateAction, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import YearPicker from '@/presentation/global-component/UI/YearPicker/YearPicker';
import BulkInputContainer from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInput/BulkInput/BulkInputContainer';
import BulkInputTitle from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInput/BulkInput/BulkInputTitle';
import BulkInputUpload from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInput/BulkInput/BulkInputUpload';
import BulkInputTemplateDownloader from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInput/BulkInput/BulkInputTemplateDownloader';
import BulkInputSubmit from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInput/BulkInput/BulkInputSubmit';
import useInputBulkDepartmentDataMutation from '@/repository/mutation/department/InputBulkDepartmentDataMutation';
import { useCurrentYear } from '@/controller/context/CurrentYearContext';
import { SubHeader } from '@/presentation/global-component/UI/Typography';

interface DepartmentBulkInputProps {
  open: boolean;
  indicatorID: number;
  indicatorName: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DepartmentBulkInput: FC<DepartmentBulkInputProps> = (props) => {
  const { open, setOpen, indicatorName, indicatorID } = props;

  const { currentYear, handleSelectYear } = useCurrentYear();

  const [successDialog, setSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<any[]>([]);
  const [fileName, setFileName] = useState('Browse file');
  const [inputKey, setInputKey] = useState('');
  const [excelError, setExcelError] = useState('');
  const [toggle, setToggle] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess } =
    useInputBulkDepartmentDataMutation();

  const handleClose = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  }, []);

  const handleMessageClose = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setSuccessDialog(false);
    },
    []
  );

  const handleToggleChange = (event: any, newToggle: boolean) => {
    setToggle(newToggle);
  };

  const handleFile = (file: any) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e: any) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[1];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = utils.sheet_to_json(ws, {
        header: ['no', 'major_name', 'q1', 'q2', 'q3', 'q4', 'target_value'],
        range: 1,
      });
      /* Update state */
      setCurrentFile(data);
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleChange = (e: any) => {
    const files = e.target.files;

    if (files && files[0]) {
      handleFile(files[0]);
      setFileName(files[0].name);
    }
  };

  const removeCurrentFile = () => {
    setInputKey(Math.random().toString(36));
    setCurrentFile([]);
    setFileName('Browse file');
    setExcelError('');
  };

  const handleSubmit = () => {
    if (!Array.isArray(currentFile) || currentFile.length === 0) {
      console.log('Ksosong');
      return;
    }

    const payload: any = [];

    for (let i = 0; i < currentFile.length; i++) {
      const element = currentFile[i];

      if (Object.keys(element).length !== 7) {
        setExcelError('Error! File yang diupload tidak sesuai dengan template');
        break;
      } else {
        setExcelError('');

        payload.push({
          department_id: i + 1,
          target_quarter: {
            q1: element.q1,
            q2: element.q2,
            q3: element.q3,
            q4: element.q4,
            target_value: element.target_value,
          },
        });
      }
    }

    if (payload.length !== 0) {
      setLoading(true);

      mutate(
        {
          indicator_id: indicatorID,
          is_overwrite: true,
          year_value: Number(currentYear || 0),
          indicator_list: payload,
        },
        {
          onSuccess: (res) => {
            if (res.status >= 400) {
              throw res.data.message;
            } else {
              setSuccessDialog(true);
              setLoading(false);
              removeCurrentFile();

              queryClient.invalidateQueries(['indicator', String(indicatorID)]);
            }
          },
          onError: () => {
            setLoading(false);
          },
        }
      );
    }
  };

  return (
    <BulkInputContainer
      isLoading={loading}
      openDialog={open}
      openSuccessDialog={successDialog}
      handleClose={handleClose}
      handleSuccessClose={handleMessageClose}
    >
      <BulkInputTitle indicatorName={indicatorName} />
      <Stack gap={2}>
        <Box>
          <SubHeader text="Pilih tahun" sx={{ pb: 1 }} />
          <YearPicker
            isFullWidth
            yearValue={currentYear}
            handleSelectYear={handleSelectYear}
          />
        </Box>
        <BulkInputUpload
          error={error}
          isError={isError}
          fileName={fileName}
          inputKey={inputKey}
          excelError={excelError}
          currentFile={currentFile}
          handleChange={handleChange}
          removeCurrentFile={removeCurrentFile}
        />
        <BulkInputTemplateDownloader
          link={`${import.meta.env.VITE_BASE_API_URL}template/department`}
        />
        <Alert severity="warning">
          Data yang ada pada sistem akan direplace dengan data baru yang akan
          di-upload
        </Alert>
        <BulkInputSubmit handleSubmit={handleSubmit} fileName={fileName} />
      </Stack>
    </BulkInputContainer>
  );
};

export default DepartmentBulkInput;
