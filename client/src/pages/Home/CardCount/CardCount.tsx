import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import Card from '@/components/UI/Card';
import CountCard from '@/components/UI/CountCard';
import ProgressCard from '@/components/UI/ProgressCard';
import { Header, SubHeader } from '@/components/UI/Typography';
import { ERROR, GREY, SUCCESS } from '@/components/theme/Colors';

interface CardCountProps {
  value: number;
  title: string;
  backgroundColor: string;
  color: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const CardCount: FC<CardCountProps> = (props) => {
  const { Icon, title, value, backgroundColor, color } = props;

  return (
    <Card>
      <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 80 }}>
        <Avatar
          sx={{
            backgroundColor,
            color,
            border: `1px solid ${color}`,
            width: 64,
            height: 64,
          }}
        >
          <Icon />
        </Avatar>
        <Box sx={{ mt: 2 }}>
          <SubHeader text={title} sx={{ textAlign: 'center' }} />
          <Header text={`${value}`} variant="h3" sx={{ textAlign: 'center' }} />
        </Box>
      </Stack>
    </Card>
  );
};

export default CardCount;
