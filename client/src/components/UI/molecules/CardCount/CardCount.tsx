import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import Card from '@/components/UI/atoms/Card';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';

interface CardCountProps {
  value: number;
  title: string;
  color: string;
  backgroundColor: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  variant?: string;
}

const CardCount: FC<CardCountProps> = (props) => {
  const {
    Icon,
    title,
    value,
    backgroundColor,
    color,
    variant = 'primary',
  } = props;

  switch (variant) {
    case 'secondary':
      return (
        <Card>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack flexDirection="row" alignItems="center">
              <Avatar
                sx={{
                  backgroundColor,
                  color,
                  border: `1px solid ${color}`,
                }}
              >
                <Icon />
              </Avatar>
              <SubHeader text={title} sx={{ ml: 1 }} />
            </Stack>
            <Header text={`${value}`} />
          </Stack>
        </Card>
      );

    default:
      return (
        <Card>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 80 }}
          >
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
              <Header
                text={`${value}`}
                variant="h3"
                sx={{ textAlign: 'center' }}
              />
            </Box>
          </Stack>
        </Card>
      );
  }
};

export default CardCount;
