import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import Card from '@/components/UI/Card';
import { Header, SubHeader } from '@/components/UI/Typography';

interface CountCard {
  title: string;
  value: string;
  color: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const CountCard: FC<CountCard> = (props) => {
  const { title, value, color, Icon } = props;

  return (
    <Card>
      <Stack flexDirection="row" alignItems="center">
        <Avatar sx={{ mr: 1, backgroundColor: color }}>
          <Icon />
        </Avatar>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ flex: 1 }}
        >
          <SubHeader text={title} />
          <Header variant="subtitle1" text={value} />
        </Stack>
      </Stack>
    </Card>
  );
};

export default CountCard;
