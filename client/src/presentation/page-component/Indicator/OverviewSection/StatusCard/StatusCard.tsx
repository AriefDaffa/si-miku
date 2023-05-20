import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import Flexer from '@/presentation/global-component/UI/Flexer';
import {
  ERROR,
  GREY,
  SUCCESS,
} from '@/presentation/global-component/theme/Colors';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';

interface StatusCardProps {
  cardType: 'success' | 'error' | 'notSet';
  title: string;
  value: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const StatusCard: FC<StatusCardProps> = (props) => {
  const { title, value, Icon, cardType } = props;

  return (
    <Card sx={{ px: 1, py: 2, height: '100%' }}>
      <Stack
        justifyContent="flex-start"
        alignItems="center"
        sx={{ height: '100%' }}
      >
        <Flexer
          sx={{
            p: 1,
            borderRadius: 2,
            backgroundColor:
              cardType === 'success'
                ? SUCCESS.light
                : cardType === 'error'
                ? ERROR.light
                : GREY[400],
            color:
              cardType === 'success'
                ? SUCCESS.dark
                : cardType === 'error'
                ? ERROR.dark
                : GREY[800],
            width: 'min-content',
          }}
        >
          <Icon sx={{ fontSize: '50px' }} />
        </Flexer>
        <Stack justifyContent="center" alignItems="center">
          <SubHeader text={title} sx={{ mt: 2, textAlign: 'center' }} />
          <Header text={value} variant="h3" />
        </Stack>
      </Stack>
    </Card>
  );
};

export default StatusCard;
