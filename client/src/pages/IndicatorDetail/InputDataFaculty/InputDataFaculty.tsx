import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@/components/UI/atoms/Grid';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { alpha } from '@mui/material/styles';
import { GREY } from '@/components/theme/Colors';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';

import FormInput from './FormInput';
import BulkInput from './BulkInput';

interface InputDataFacultyProps {
  indicatorID: number;
}

const InputDataFaculty: FC<InputDataFacultyProps> = (props) => {
  const { indicatorID } = props;

  return (
    <MuiAccordion
      sx={{
        boxShadow: `0 0 2px 0 ${alpha(
          GREY[500],
          0.2
        )}, 0 12px 24px -4px ${alpha(GREY[500], 0.12)}`,
      }}
    >
      <MuiAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack flexDirection="column" sx={{ py: 1 }}>
          <Header text="Input Data Indikator" />
          <SubHeader text="Tambah data indikator pada sistem" />
        </Stack>
      </MuiAccordionSummary>
      <MuiAccordionDetails>
        <Box sx={{ backgroundColor: GREY[200], p: 1, mt: 2, borderRadius: 2 }}>
          <Grid
            spacing={1}
            gridItem={[
              <BulkInput indicatorID={indicatorID} />,
              <FormInput indicatorID={indicatorID} />,
            ]}
          />
        </Box>
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

export default InputDataFaculty;
