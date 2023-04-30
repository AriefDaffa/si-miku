import { useMemo, useState } from 'react';
import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import BarChartIcon from '@mui/icons-material/BarChart';
import type { SxProps } from '@mui/material';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import TextWithSubHeader from '@/components/UI/molecules/TextWithSubHeader';

interface AvatarTitleProps {
  imageURL: string;
  subHeader: string;
  header: string;
  isImageIcon?: boolean;
  sx?: SxProps;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const AvatarTitle: FC<AvatarTitleProps> = (props) => {
  const {
    imageURL,
    subHeader,
    header,
    isImageIcon = false,
    sx = {},
    Icon = BarChartIcon,
  } = props;

  return (
    <Stack sx={sx}>
      <Stack
        alignItems="center"
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ my: 1 }}
      >
        {isImageIcon ? (
          <Icon sx={{ fontSize: '35px' }} />
        ) : (
          <Avatar
            src={imageURL}
            alt="tif"
            variant="rounded"
            sx={{ width: 'fit-content' }}
          />
        )}
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <TextWithSubHeader header={header} subHeader={subHeader} />
      </Stack>
    </Stack>
  );
};

export default AvatarTitle;
