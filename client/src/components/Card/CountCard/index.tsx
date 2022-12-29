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
  withStat?: boolean;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const CountCard: FC<CountCardProps> = (props) => {
  const { title, value, iconColor, Icon, withStat = true } = props;
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid item xs={8} lg={9}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
              sx={{ overflowWrap: 'break-word' }}
            >
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h3">
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
        {withStat && (
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
              Dari tahun sebelumnya
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CountCard;
