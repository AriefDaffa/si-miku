import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CreateIcon from '@mui/icons-material/Create';

import TextWithSubHeader from '@/presentation/global-component/UI/TextWithSubHeader';

interface FormInputTitleProps {
  indicatorName: string;
}

const FormInputTitle: FC<FormInputTitleProps> = (props) => {
  const { indicatorName } = props;

  return (
    <Stack
      alignItems="center"
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ my: 1 }}
    >
      <CreateIcon />
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      <TextWithSubHeader
        header={indicatorName}
        subHeader="Input Data Indikator"
      />
    </Stack>
  );
};

export default FormInputTitle;
