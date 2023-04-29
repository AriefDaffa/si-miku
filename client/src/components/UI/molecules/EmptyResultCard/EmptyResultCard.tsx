import { noop } from 'lodash';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import Card from '@/components/UI/atoms/Card';
import emptyIcon from '@/assets/logo/empty.png';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface EmptyResultCardProps {
  message: string;
  imageURL: string;
  title: string;
  type: 'department' | 'major';
  withButtonAction?: boolean;
  onButtonClick?: () => void;
}

const EmptyResultCard: FC<EmptyResultCardProps> = (props) => {
  const {
    message,
    imageURL,
    title,
    type,
    withButtonAction = false,
    onButtonClick = noop,
  } = props;
  return (
    <Box>
      <Card>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ my: 4 }}>
            <Stack justifyContent="center" alignItems="center">
              <img src={emptyIcon} alt="" style={{ width: 200 }} />
            </Stack>
            <SubHeader text={message} sx={{ textAlign: 'center' }} />
            {withButtonAction && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component="label"
                // startIcon={<FileUploadIcon />}
                onClick={onButtonClick}
                sx={{
                  mt: 2,
                  backgroundColor: PRIMARY.main,
                  color: 'white',
                  ':hover': { backgroundColor: PRIMARY.light },
                }}
              >
                Tambah Data
              </Button>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default EmptyResultCard;
