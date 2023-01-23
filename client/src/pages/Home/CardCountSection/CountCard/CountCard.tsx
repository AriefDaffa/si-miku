import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import CustomCard from '@/components/CustomCard';
import { SubHeader, Header } from '@/components/Typography';

interface CountCardProps {
  backgroundColor: string;
  value: string;
  text: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const CountCard: FC<CountCardProps> = (props) => {
  const { backgroundColor, Icon, value, text } = props;

  return (
    <CustomCard>
      <Stack justifyContent="center" alignItems="center">
        <Avatar
          sx={{
            backgroundColor,
            height: 56,
            width: 56,
          }}
        >
          <Icon />
        </Avatar>
        <Header
          text={value}
          variant="h3"
          sx={{ color: backgroundColor, py: 1 }}
        />
        <SubHeader text={text} sx={{ textAlign: 'center' }} />
      </Stack>
    </CustomCard>
  );
};

export default CountCard;
