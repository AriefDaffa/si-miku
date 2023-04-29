import type { FC, ReactNode } from 'react';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import { GREY } from '@/presentation/global-component/theme/Colors';

interface AccordionProps {
  titleComponent: ReactNode;
  itemComponent: ReactNode;
}

const Accordion: FC<AccordionProps> = (props) => {
  const { titleComponent, itemComponent } = props;
  return (
    <MuiAccordion
      disableGutters
      elevation={0}
      square
      sx={{
        border: `1px solid ${GREY[300]}`,
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
      }}
    >
      <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      >
        {titleComponent}
      </MuiAccordionSummary>
      <MuiAccordionDetails
        sx={{
          borderTop: '1px solid rgba(0, 0, 0, .125)',
          backgroundColor: GREY[200],
        }}
      >
        {itemComponent}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
