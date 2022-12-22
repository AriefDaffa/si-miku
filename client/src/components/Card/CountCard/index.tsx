import type { FC } from 'react';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

interface CountCardProps {
  title: string;
  value: string;
  iconColor: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const CountCard: FC<CountCardProps> = (props) => {
  const { title, value, iconColor, Icon } = props;
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: iconColor,
                height: 56,
                width: 56,
              }}
            >
              <Icon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowDownwardIcon color="error" />
          <Typography
            color="error"
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountCard;
