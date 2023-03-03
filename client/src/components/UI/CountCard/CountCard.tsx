import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import Card from '@/components/UI/Card';
import { SubHeader, Header } from '@/components/UI/Typography';

interface CountCardProps {
  backgroundColor: string;
  value: string;
  text: string;
  // Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const CountCard: FC<CountCardProps> = (props) => {
  const { backgroundColor, value, text } = props;

  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <SubHeader text={text} sx={{ flex: 2 }} />
        <Header
          text={value}
          variant="h2"
          sx={{ color: backgroundColor, textAlign: 'center' }}
        />
        <Box sx={{ flex: 1 }}></Box>
      </Box>
    </Card>
  );
};

export default CountCard;
