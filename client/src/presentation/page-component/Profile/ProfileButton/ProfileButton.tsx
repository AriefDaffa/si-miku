import type { FC, ChangeEvent } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';

import { ERROR, PRIMARY } from '@/presentation/global-component/theme/Colors';

interface ProfileButtonProps {
  inputKey: string;
  currentImage: any;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
}

const ProfileButton: FC<ProfileButtonProps> = (props) => {
  const { currentImage, handleImageChange, handleRemoveImage, inputKey } =
    props;

  return (
    <Stack
      justifyContent="center"
      direction={{ sm: 'row' }}
      sx={{ py: 2, gap: 2 }}
    >
      <Button
        variant="outlined"
        color="primary"
        component="label"
        startIcon={<FileUploadIcon />}
        sx={{
          border: 2,
          borderColor: PRIMARY.main,
          color: PRIMARY.main,
          ':hover': { border: 2, borderColor: PRIMARY.light },
        }}
      >
        Upload Image
        <input
          hidden
          accept="image/*"
          type="file"
          key={inputKey || ''}
          onChange={handleImageChange}
        />
      </Button>
      <Button
        variant="outlined"
        // color="error"
        onClick={handleRemoveImage}
        disabled={currentImage === ''}
        startIcon={<DeleteIcon />}
        sx={{
          border: 2,
          borderColor: ERROR.main,
          color: ERROR.main,
          ':hover': { borderColor: ERROR.light },
        }}
      >
        Delete Image
      </Button>
    </Stack>
  );
};

export default ProfileButton;
